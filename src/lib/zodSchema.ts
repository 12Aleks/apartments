//validation data in forms
import {z} from "zod";

// Zod schema definitions
const AwardSchema = z.object({
    value: z.string(),
});

export const AddUnitFormSchema = z.object({
    title: z.string().min(1, "Please enter the title"),
    description: z.string().min(2, "Enter the description"),
    badgeUrl: z.string(),
    organizationId: z.string().transform((data) => Number(data)),
    typeId: z.string().transform((data) => Number(data)),
    awardsList: z.array(AwardSchema),
});