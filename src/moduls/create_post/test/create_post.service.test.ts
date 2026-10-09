import { describe, vi, expect, it } from 'vitest'
import { CreatePostService } from '../create_post.service'
import { createPost } from '../create_post.repository'

vi.mock("../create_post.repository")

describe("Service POST /create-post", () => {
    it("post created", async () => {
        const service = new CreatePostService()
        const date = new Date();

        const dia = date.getDate()
        const mes = date.getMonth()

        await service.createPost("mocked content", "mocked userId", "mocked userName")

        const post = {
            content: "mocked content",
            userId: "mocked userId",
            name: "mocked userName",
            fecha: `${dia} - ${mes + 1}`
        }
        expect(createPost).toHaveBeenCalledWith(post)
    })
})