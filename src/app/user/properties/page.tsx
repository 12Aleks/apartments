import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import PropertiesTable from "@/app/user/properties/_components/PropertiesTable";
import BlockTitle from "@/app/components/blockTitle";

const PAGE_SIZE = 12;



interface Props{
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const PropertiesPage = async({searchParams}: Props) => {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();
    const pagenum = searchParams.pagenum ?? 0;

    const propertiesPromise =  await prisma.property.findMany({
        where: {
            userId: user.id,
        },
        include: {
            type: true,
            status: true,

        },
        skip: +pagenum * PAGE_SIZE,
        take: PAGE_SIZE
    });
  const totalPropertiesPromise =  prisma.property.count({
      where: {
          userId: user.id,
      }
  })
    const [properties, totalProperties] = await Promise.all([propertiesPromise, totalPropertiesPromise]);

    const totalPages = Math.floor(totalProperties / PAGE_SIZE);


    return <div className="p-3 h-100">
        <BlockTitle title={"Properties list"} className="mb-3"/>
        <PropertiesTable properties={properties} totalPages={totalPages} currentPage={+pagenum} />
        </div>
};

export default PropertiesPage;