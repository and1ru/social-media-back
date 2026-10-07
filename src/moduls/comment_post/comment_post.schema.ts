import z from 'zod'

export const commentPostSchema = z.object({
    comment: z.string().min(1, "comment is required"),
    postId: z.string().min(1, "postId is required")
})