"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    email: zod_1.z.string().email({ message: "Invalid email type" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password should atleast be of 8 characters" }),
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().min(1, { message: "Invalid email type" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password should atleast be of 8 characters" }),
});
