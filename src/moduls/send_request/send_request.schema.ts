import z from 'zod'

export const sendRequestSchema = z.object({
    receiver: z.string(),
})

export type sendRequestType = z.infer<typeof sendRequestSchema>