import { z } from "zod";
export declare const signUpInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type signUpType = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signInType = z.infer<typeof signInInput>;
export declare const itemInput: z.ZodObject<{
    category: z.ZodString;
    itemName: z.ZodString;
    itemPrice: z.ZodNumber;
    itemQuantity: z.ZodNumber;
    itemDescription: z.ZodString;
    itemImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    category: string;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    itemDescription: string;
    itemImage?: string | undefined;
}, {
    category: string;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
    itemDescription: string;
    itemImage?: string | undefined;
}>;
export type itemInputType = z.infer<typeof itemInput>;
