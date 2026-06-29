import z from 'zod'

export const findUsersSchema = z.object({
    name: z.string()
})

export type findFriendsType = z.infer<typeof findUsersSchema>