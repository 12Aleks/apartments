import prisma from "@/lib/prisma";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyContainer from "@/app/components/PropertyContainer";

export default async function Home() {
  const properties = await prisma.property.findMany({
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
    }
  })

  return (
    <main className="">
        <PropertyContainer>
            {
                properties.map((property) => <PropertyCard property={property} key={property.id}/>)
            }
        </PropertyContainer>

    </main>
  );
}
