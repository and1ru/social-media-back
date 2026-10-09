import z from 'zod'

export const acceptRequestSchema = z.object({
    id: z.string().min(1, "id is required")
})

export type acceptRequestType = z.infer<typeof acceptRequestSchema>