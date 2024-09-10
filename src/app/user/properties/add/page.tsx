import React from 'react';
import AddPropertyForm from "./_components/AddPropertyForm";
import prisma from "@/lib/prisma";

const AddPage = async () => {
    const [propertyTypes, propertyStatuses] = await Promise.all([
        prisma.propertyType.findMany(),
        prisma.propertyStatus.findMany(),
    ]);

    return (
        <div>
            <AddPropertyForm types={propertyTypes} statuses={propertyStatuses} />
        </div>
    );
};

export default AddPage;