import z from 'zod'

export const loginSchema = z.object({
    email: z.email("must be an email"),
    password: z.string().min(8, "must be at least 8 length")
})

export type loginType = z.infer<typeof loginSchema>