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
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should atleast be of 8 characters" }),
});

export type signInType = z.infer<typeof signInInput>;

export const itemInput = z.object({
	category: z.string().min(1, { message: "Category cannot be empty" }),
	itemName: z.string().min(1, { message: "Item Name cannot be empty" }),
	itemPrice: z.number().min(1, { message: "Item Price cannot be empty" }),
	itemQuantity: z.number().min(1, { message: "Item Quantity cannot be empty" }),
	itemImage: z.string().url().optional(),
});

export type itemInputType = z.infer<typeof itemInput>;
