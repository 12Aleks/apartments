import prisma from "@/lib/prisma";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";

const PAGE_SIZE = 12;


interface Props{
    searchParams: {
        [key: string]: string |string[] |undefined;
    }
}


export default async function Home({searchParams}: Props) {
  const pagenum =  searchParams.pagenum ?? 0

  const propertiesPromise = prisma.property.findMany({
    select: {
       id: true,
       name: true,
       price: true,
       images: {
           select: {
               url: true,
           }
       },
        location: {
           select: {
               city: true,
               state: true,
           }
        }
    },
     skip: Number(pagenum) * PAGE_SIZE,
     take: PAGE_SIZE
  });


  const totalPropertiesPromise = prisma.property.count()


  const [properties, totalProperties] = await Promise.all([propertiesPromise, totalPropertiesPromise]);

  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  return (
    <main className="">
        <PropertyContainer totalPages={totalPages} currentPage={+pagenum} >
            {
                properties.map((property) => <PropertyCard property={property} key={property.id}/>)
            }
        </PropertyContainer>

    </main>
  );
}
