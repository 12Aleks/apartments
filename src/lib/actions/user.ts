"use server"

import {User} from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return null;
    }

    return user;
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