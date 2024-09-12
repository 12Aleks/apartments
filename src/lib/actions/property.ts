"use server"

import prisma from "@/lib/prisma";
import {AddPropertyInputType} from "@/app/user/properties/add/_components/AddPropertyForm";
import {Property} from "@prisma/client";

export async function saveProperty(propertyData: AddPropertyInputType, imagesUrls: string[], userId: string) {
    const basic: Omit<Property, "id"> = {
        name: propertyData.name,
        description: propertyData.description,
        price: propertyData.price,
        statusId: propertyData.statusId,
        typeId: propertyData.typeId,
        userId,
    }

    const result = await prisma.property.create({
        data: {
            ...basic,
            location: {
                create: propertyData.location,
            },
            feature: {
                create: propertyData.propertyFeature
            },
            contact: {
                create: propertyData.contact,
            },
            images: {
                create: imagesUrls.map(imageUrl => ({
                    url: imageUrl
                })),
            }
        }
    });

    console.log(result)

    return result
}

