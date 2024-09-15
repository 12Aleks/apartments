"use client"
import {Prisma} from "@prisma/client";

import {Table, TableBody, TableColumn, TableHeader, TableRow, TableCell, Tooltip, Pagination} from "@nextui-org/react";
import Link from "next/link";
import {PencilIcon, TrashIcon, EyeIcon} from "@heroicons/react/16/solid";
import {useRouter} from "next/navigation";

type Props = {
    //Tak kak property tip i dannyje otliczajutsa modificyrujem tip dannych
    properties: Prisma.PropertyGetPayload<{
        include: {
            type: true;
            status: true;
        }
    }>[],
    totalPages: number,
    currentPage: number
}

const PropertiesTable = ({properties, totalPages, currentPage}: Props) => {
    const router = useRouter();

    return (
        <>
        <Table className="rounded-t-none">
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    properties.map(item => <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.type.value}</TableCell>
                        <TableCell>{item.status.value}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Tooltip content="Detals">
                                <Link href={`/property/${item.id}`}><EyeIcon className="w-5 text-state-500"></EyeIcon></Link>
                                </Tooltip>
                                <Tooltip content="Edit property" color="warning">
                                    <Link href={`/user/properties/${item.id}/edit`}>
                                        <PencilIcon className="w-5 text-yellow-500"></PencilIcon>
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Delete property" color="danger">
                                    <Link href={`/user/properties/${item.id}/delete`}>
                                        <TrashIcon className="w-5 text-red-500"></TrashIcon>
                                    </Link>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
            <Pagination total={totalPages} initialPage={1} page={currentPage} className="mt-3 flex flex-col items-center gap-4"
            onChange={(page: number) => router.push(`/user/properties?pagenum=${page}`)}
            />
        </>
    );
};

export default PropertiesTable;