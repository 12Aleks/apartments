"use server"

import {User} from "@prisma/client";
import prisma from "@/lib/prisma";
import {user} from "@nextui-org/react";

export async function getUserById(id: string): Promise<User> {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}

export async function updateAvatarUrl(avatarUrl: string, userId: string): Promise<User> {
   return prisma.user.update({
       where:{
            id: userId,
       },
       data: {
           avatarUrl: avatarUrl,
       }
   })
}