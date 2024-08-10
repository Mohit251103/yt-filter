import { z } from "zod";

export const SpaceFormSchema = z.object({
    title: z.string()
        .min(1, "Cannot be empty")
        .max(100, "Cannot exceed more than 20 characters"),

    category: z.string()
        .min(1, "Cannot be empty"),

    description: z.string()
    .max(200,"Cannot exceed 200 characters").optional(),

    photo: z.string()
        .endsWith(`${".jpg" || ".jpeg" || ".png"}`, "Must be a valid image").optional(),

    tags: z.string()
        .optional(),

    needShorts: z.enum(['1','0']).optional()
})