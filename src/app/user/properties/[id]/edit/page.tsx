import React from 'react';
import prisma from "@/lib/prisma";
import AddPropertyForm from "@/app/user/properties/add/_components/AddPropertyForm";
import {notFound, redirect} from "next/navigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
    params: {
        id: string;
    }
}

const EditPropertyPage = async ({params}: Props) => {

    const propertyData = prisma.property.findUnique({
        where: {
            id: Number(params.id)
        }, include: {
            location: true,
            feature: true,
            contact: true,
            images: true,
        }
    });

    const propertyTypeData =  prisma.propertyType.findMany()
    const propertyStatusData =  prisma.propertyStatus.findMany()

    const [propertyTypes, propertyStatus, property] = await Promise.all([propertyTypeData, propertyStatusData ,propertyData]);

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!property) return notFound();
    if(!user || property.userId !== user.id) redirect("/unauthorized");

    return (
        <AddPropertyForm types={propertyTypes} statuses={propertyStatus} property={property} isEdit={true} />

    );
};

export default EditPropertyPage;