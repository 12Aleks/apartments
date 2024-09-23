import SubmitButton from "@/app/components/SubmitButton";
import { deleteProperty } from "@/lib/actions/property";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: { id: string };
}

async function DeletePropertyPage({ params }: Props) {
    const { getUser } = getKindeServerSession();
    const propertyPromise = prisma.property.findUnique({
        where: {
            id: +params.id,
        },
    });
    const [property, user] = await Promise.all([propertyPromise, getUser()]);

    if (!property) return notFound();
    if (!user || property.userId !== user.id) redirect("/unauthorized");

    const deleteAction = async () => {
        "use server";
        try {
            await deleteProperty(+params.id);
            redirect("/user/properties");
        } catch (e) {
            throw e;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100" style={{ height: "calc(100vh - 125px)" }}>
        <form action={deleteAction} className="flex flex-col items-center justify-center bg-gray-200 border-1 border-gray-300 p-5 rounded-md">
            <p>Are you sure to delete this property?</p>
            <p>
                <span className="text-slate-400">Name: </span>{" "}
                <span className="text-slate-700">{property.name}</span>
            </p>
            <div className="flex justify-center gap-3">
                <Link href={"/user/properties"}>
                    <Button>Cancel</Button>
                </Link>
                <SubmitButton type="submit" color="danger">
                    Delete
                </SubmitButton>
            </div>
        </form>
        </div>
    );
}

export default DeletePropertyPage;


