import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z.string().min(8, "Password too short.")
});

export const RegisterSchema = z.object({
    username: z.string("Username Invalid.").min(3, "Username too short."),
    email: z.string().email("Invalid email."),
    password: z.string().min(8, "Password too short.")
});