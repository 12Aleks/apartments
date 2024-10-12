"use server"

import prisma from "@/lib/prisma";

interface Props{
    paymentId: string
    planId: number
    userId: string
}

export const saveSubscription = async({paymentId,planId,  userId}: Props) =>{
     try{
        await prisma.subscriptions.create({
            data: {
                paymentID: paymentId,
                user: {
                    connect: {
                        id: userId
                    }
                },
                plan: {
                    connect: {
                        id: planId,
                    }
                }
            }
        });
        return {
            message: "Subscription Saved Successfully"
        }
     }catch(e: any){
        return{
            message:`Something went wrong. Please try again later! Information about error ${e}`
        }
     }
}