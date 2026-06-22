import z from "zod"

export const sendMessageSchema = z.object({
    date: z.date(),
    text: z.string(),
    userId: z.string()
})

export type sendMessageType = z.infer<typeof sendMessageSchema>