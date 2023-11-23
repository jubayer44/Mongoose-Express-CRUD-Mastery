import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message:
      'First name must start with a capital letter and only contain letters',
  }),
  lastName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message:
      'First name must start with a capital letter and only contain letters',
  }),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: nameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
