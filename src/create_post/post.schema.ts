import z from 'zod'

export const postSchema = z.object({
    content: z.string(),
    likes: z.number(),
    comentarios: z.array(z.string()) // ["muy bien", "muy mal", "100"]
})

export type postType = z.infer<typeof postSchema>