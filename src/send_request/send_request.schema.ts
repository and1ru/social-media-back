import z from 'zod'

export const sendRequestSchema = z.object({
    sender: z.string(),
    receiver: z.string(),
})

export type sendRequestType = z.infer<typeof sendRequestSchema>