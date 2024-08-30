"use server"

import {Unit, User} from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getUnitById(id: number): Promise<Unit> {
    return prisma.unit.findUnique({
        where: {
            id
        }
    });
}

export async function updateBadgeUrl(badgeUrl: string, unitId: number): Promise<Unit> {
    return prisma.unit.update({
        where: {
            id: unitId,
        },
        data: {
            badgeUrl: badgeUrl,
        }
    })
}