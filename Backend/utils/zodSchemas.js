const zod = require('zod');

const userSignupSchema = zod.object({
    email: zod.string().email().trim().toLowerCase(),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    password: zod.string().trim().min(6)
});

const userSigninSchema = zod.object({
    email: zod.string().email().trim().toLowerCase(),
    password: zod.string().trim()
});

const userUpdateSchema = zod.object({
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional(),
    password: zod.string().trim().min(6).optional()
});

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number().min(1)
})

module.exports = { userSignupSchema, userSigninSchema, userUpdateSchema,transferSchema };