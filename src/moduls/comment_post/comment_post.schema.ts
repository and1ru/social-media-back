import z from 'zod'

export const commentPostSchema = z.object({
    comment: z.string().min(1, "is required"),
    postId: z.string().min(1, "is required")
})