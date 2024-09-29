import {Prisma} from "@prisma/client";
import {Card, Image} from "@nextui-org/react";
import Link from "next/link";

interface Props{
    property: Prisma.PropertyGetPayload<{
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
    }>
}

const PropertyCard = ({property}:Props) => {
    return (
        <Card className="w-80 flex flex-col hover:scale-105" shadow="md">
            <Image radius="none" src={property.images[0].url} alt={property.name} className="object-fill w-96 h-48 rounded-0" />
            <div className="p-4 h-full flex flex-col">
                <p className="text-primary-600 text-xl font-bold">{property.name}</p>
                <p className="text-slate-600 mt-auto">{property.location?.city}, {property.location?.state}</p>
            </div>
            <div className="bg-gradient-to-br from-state-50 to-state-200 p-4 flex justify-between mt-auto border-t-1 border-t-gray-200">
              <p>{property.price?.toLocaleString()}</p>
              <Link className="hover:text-primary-500 transition-colors" href={`/property/${property.id}`}>
                   View Details
              </Link>
            </div>
        </Card>
    );
};

export default PropertyCard;