import z from 'zod'

export const postSchema = z.object({
    content: z.string()
})

export type postType = z.infer<typeof postSchema>