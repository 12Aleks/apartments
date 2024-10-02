import prisma from "@/lib/prisma";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";
import Search from "@/app/components/Search";

const PAGE_SIZE = 12;

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

export default async function Home({searchParams}: Props) {
    // Use 1-indexed pagination for user-facing behavior (default page is 1)
    const pagenum = searchParams.pagenum ? Number(searchParams.pagenum) : 1;

    const query = searchParams.query ?? "";
    const type = searchParams.type === 'all' ? "" : searchParams.type ?? "";
    const min = searchParams.min ? Number(searchParams.min) : undefined;
    const max = searchParams.max ? Number(searchParams.max) : undefined;


    const propertiesPromise = prisma.property.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            images: {
                select: {
                    url: true,
                },
            },
            location: {
                select: {
                    city: true,
                    state: true,
                },
            },
        },
        where: {
            ...(!!query && {
                name: {
                    contains: String(query),
                },
            }),
            ...(!!type && {
                type: {
                    is: {
                        value: {
                            contains: String(type),
                        },
                    },
                },
            }),
            price: {
                ...(min !== undefined && { gte: min }),
                ...(max !== undefined && { lte: max }),
            }
        },
        skip: (pagenum - 1) * PAGE_SIZE,  // Ensure page 1 starts from 0 index
        take: PAGE_SIZE,
    });

    const priceRange = prisma.property.aggregate({
        _min: {
            price: true, // Get the minimum price
        },
        _max: {
            price: true, // Get the maximum price
        },
    });

    const totalTypes = prisma.propertyType.findMany()

    const totalPropertiesPromise = prisma.property.count({
        ...(!!query && {
            where: {
                name: {
                    contains: String(query),
                },
            },
        }),
    });

    const [properties, totalProperties, types, price] = await Promise.all([propertiesPromise, totalPropertiesPromise, totalTypes, priceRange]);

    const totalPages = Math.ceil(totalProperties / PAGE_SIZE);  // Make sure to round up to the next whole number

    return (
        <main>
            <Search types={types} price={price}/>
            <PropertyContainer totalPages={totalPages} currentPage={pagenum}>
                {properties.map((property) => (
                    <PropertyCard property={property} key={property.id}/>
                ))}
            </PropertyContainer>
        </main>
    );
}
