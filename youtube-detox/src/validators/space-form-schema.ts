import { z } from "zod";

export const SpaceFormSchema = z.object({
    title: z.string()
        .min(1, "Set a name for your space")
        .max(20, "Cannot exceed more than 20 characters")
        .regex(/^[a-z0-9_]+$/, "Could only use lowercase letters, numbers and underscore"),

    category: z.string()
        .min(1, "Category cannot be empty")
        .regex(/^([A-Z][a-z]*|[A-Z]+|[a-z]+)$/, "Could only use lowercase or uppercase letters"),

    photo: z.string()
        .endsWith(`${"jpg" || "jpeg" || "png"}`, "Must be a valid image").optional(),

    tags: z.string()
        .optional(),

    theme: z.enum(["dark", "light"])
        .optional(),

    needShorts: z.boolean().optional()
})