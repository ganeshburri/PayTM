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

module.exports = { userSignupSchema, userSigninSchema };