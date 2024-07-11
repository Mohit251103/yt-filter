import * as z from "zod";

export const UsernameSchema = z.object({
    username:z.string()
    .min(1,{message:"Username is required"})
    .max(15,{message:"Username should be max 15 characters long"})
    .regex(/^[a-z0-9!@#$%^&*()_+[\]{};':",.<>/?\\|`~=-]+$/,{message:"Username must not contain white spaces and uppercase letters"})
})