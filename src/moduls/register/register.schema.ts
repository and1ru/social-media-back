import z from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.email("must be an email"),
    password: z.string().min(8, "must be at least 8 lenght"),
})

export type registerType = z.infer<typeof registerSchema>