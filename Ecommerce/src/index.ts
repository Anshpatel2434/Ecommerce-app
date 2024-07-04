import { TypeOf, z } from "zod";

export const signUpInput = z.object({
	name: z.string().min(1, { message: "Name cannot be empty" }),
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should atleast be of 8 characters" }),
});

export type signUpType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
	email: z.string().min(1, { message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should atleast be of 8 characters" }),
});

export type signInType = z.infer<typeof signInInput>;
