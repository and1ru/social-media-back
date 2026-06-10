import z from 'zod'

export const friendsSchema = z.object({
    id: z.string()
})

export type friendsType = z.infer<typeof friendsSchema>