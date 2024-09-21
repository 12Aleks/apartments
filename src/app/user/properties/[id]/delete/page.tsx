import React from 'react';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";
import Link from "next/link";
import {Button} from "@nextui-org/react";
import {deleteProperty} from "@/lib/actions/property";

interface Props{
    params: {
        id: string;
    }
}

const DeletePropertyPage = async ({params}: Props) => {
    const {getUser} =getKindeServerSession();

    const propertyPromise = await prisma.property.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    const [property, user] = await  Promise.all([propertyPromise, getUser()])

    if(!property) return notFound();
    if(!user || property.userId !== user.id) redirect('/unauthorized');

   const deleteAction = async () => {
       "use server"
       try{
           await  deleteProperty(property.id)
           redirect("/user/property")
       }catch (e){
           console.error(e);
       }
   }


    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <form action={deleteAction} className="flex flex-col items-center justify-center bg-gray-200 border-1 border-gray-300 p-5 rounded-md">
            <p className="text-xl mb-4 capitalize">Are you sure to delete this property?</p>
            <p className="text-slate-400"><span>Name: </span><span className="text-slate-700">{property.name}</span></p>
            <div className="mt-5 flex justify-center gap-3">
                <Link  href={"/user/properties"} >
                    <Button>Cansel</Button>
                </Link>
                <Button type="submit" color="danger" >Delete</Button>
            </div>
        </form>
        </div>
    );
};

export default DeletePropertyPage;