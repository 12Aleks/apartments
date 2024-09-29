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
        ...(!!query && {
            where: {
                name: {
                    contains: String(query),
                },
            },
        }),
        skip: (pagenum - 1) * PAGE_SIZE,  // Ensure page 1 starts from 0 index
        take: PAGE_SIZE,
    });

    const totalPropertiesPromise = prisma.property.count({
        ...(!!query && {
            where: {
                name: {
                    contains: String(query),
                },
            },
        }),
    });

    const [properties, totalProperties] = await Promise.all([propertiesPromise, totalPropertiesPromise]);

    const totalPages = Math.ceil(totalProperties / PAGE_SIZE);  // Make sure to round up to the next whole number

    return (
        <main>
            <Search/>
            <PropertyContainer totalPages={totalPages} currentPage={pagenum}>
                {properties.map((property) => (
                    <PropertyCard property={property} key={property.id}/>
                ))}
            </PropertyContainer>
        </main>
    );
}
