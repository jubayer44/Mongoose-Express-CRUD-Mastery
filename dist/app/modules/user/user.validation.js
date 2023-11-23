"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const nameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
        message: 'First name must start with a capital letter and only contain letters',
    }),
    lastName: zod_1.z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
        message: 'First name must start with a capital letter and only contain letters',
    }),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: nameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    orders: zod_1.z.array(exports.orderValidationSchema).optional(),
});
exports.default = userValidationSchema;
