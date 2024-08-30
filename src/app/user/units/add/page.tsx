import React from 'react';
import AddUnitForm from "./_components/AddUnitForm";
import prisma from "@/lib/prisma";

const AddPage = async () => {
    const [unitOrganization, unitType, badgeUrl] = await Promise.all([
        prisma.unitOrganization.findMany(),
        prisma.unitType.findMany(),

    ]);

    return (
        <div>
            <AddUnitForm organization={unitOrganization} types={unitType} />
        </div>
    );
};

export default AddPage;