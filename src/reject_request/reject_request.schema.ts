import z from 'zod'

export const rejectRequestSchema = z.object({
    id: z.string()
})

export type rejectRequestType = z.infer<typeof rejectRequestSchema>