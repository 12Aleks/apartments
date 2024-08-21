import React from 'react';
import AddPropertyForm from "./_components/AddPropertyForm";
import prisma from "@/lib/prisma";

const AddPage = async () => {
    const [unitOrganization, unitType] = await Promise.all([
        prisma.unitOrganization.findMany(),
        prisma.unitType.findMany()
    ]);

    return (
        <div>
            <AddPropertyForm organization={unitOrganization} types={unitType}/>
        </div>
    );
};

export default AddPage;