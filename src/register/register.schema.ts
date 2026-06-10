import z from 'zod'

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    friends: z.array(z.string())
})

export type registerType = z.infer<typeof registerSchema>