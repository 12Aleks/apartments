//validation data in forms
import {z} from "zod";

const AwardSchema = z.object({
    value: z.string(),
});

export const AddUnitFormShema = z.object({
    title: z.string(),
    description: z.string(),
    badgeUrl: z.string(),
    organizationId: z.string().transform((data: unknown) => Number(data)),
    typeId: z.string().transform((data: unknown) => Number(data)),
    authorId: z.string(),
    awardsList: z.array(AwardSchema),
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(),
})