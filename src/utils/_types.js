import { z } from "zod";

export const UserSignupZodSchema = z.object({
    firstName: z.string().min(1, { message: "Required" }),
    middleName: z.string().min(1, { message: "Required" }),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .max(32, "Password cannot be more than 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>_]/, "Password must contain at least one special character"),
    cpassword: z.string(),
    phone: z.string().min(1, { message: "Required" }),
    alternatePhone: z.string().optional(),
    gender: z.string().min(1, { message: "Required" }),
    dob: z.string({ message: "Required" }).date(),
    address1: z.string().min(1, { message: "Required" }),
    address2: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.password !== data.cpassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cpassword"],
            message: "Passwords do not match",
        });
    };
});


export const UserLoginZodSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .max(32, "Password cannot be more than 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>_]/, "Password must contain at least one special character"),
});


export const PasswordResetZodSchema = z.object({
    newPassword: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .max(32, "Password cannot be more than 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["confirmPassword"],
            message: "Passwords do not match",
        });
    };
});