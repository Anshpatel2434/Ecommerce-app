"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    email: zod_1.z.string().email({ message: "Invalid email type" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password should atleast be of 8 characters" }),
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email type" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password should atleast be of 8 characters" }),
});
exports.itemInput = zod_1.z.object({
    category: zod_1.z.string().min(1, { message: "Category cannot be empty" }),
    itemName: zod_1.z.string().min(1, { message: "Item Name cannot be empty" }),
    itemPrice: zod_1.z.number().min(1, { message: "Item Price cannot be empty" }),
    itemQuantity: zod_1.z.number().min(1, { message: "Item Quantity cannot be empty" }),
    itemImage: zod_1.z.string().optional(),
});
