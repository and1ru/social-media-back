import z from 'zod'

export const getPostCommentsSchema = z.object({
    postId: z.string().min(1, "is required")
})