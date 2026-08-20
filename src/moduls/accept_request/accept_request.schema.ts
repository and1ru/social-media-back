import z from 'zod'

export const acceptRequestSchema = z.object({
    id: z.string()
})

export type acceptRequestType = z.infer<typeof acceptRequestSchema>