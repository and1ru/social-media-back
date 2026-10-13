import { describe, expect, vi, it, beforeEach } from "vitest";
import { DeletePostService } from "../delete_post.service";
import { deletePostRepository } from "../delete_post.repository";
import { ObjectId } from "mongodb";
import { findPost } from "../../../shared/repositories/findPostById/findPostById.repository";

vi.mock("../delete_post.repository")
vi.mock("../../../shared/repositories/findPostById/findPostById.repository")

describe("Service DELETE /post/:postId", () => {
    let service: DeletePostService
    const postId = new ObjectId().toString()
    const userId = new ObjectId().toString()

    beforeEach(() => {
        vi.clearAllMocks()
        service = new DeletePostService()
    })

    it("post deleted", async () => {
        vi.mocked(findPost).mockResolvedValue({ _id: new ObjectId(postId), userId})

        await service.deletePost(postId, userId)

        expect(findPost).toHaveBeenCalledWith(postId)
        expect(deletePostRepository).toHaveBeenCalledWith(postId)
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)

        await expect(service.deletePost(postId, userId)).rejects.toThrow("no post")        
        expect(findPost).toHaveBeenCalledWith(postId)
        expect(deletePostRepository).not.toHaveBeenCalled()
    })

    it("user did not create the post", async () => {
        vi.mocked(findPost).mockResolvedValue({ _id: new ObjectId(postId), userId: new ObjectId()})

        await expect(service.deletePost(postId, userId)).rejects.toThrow("you can't delete this post")
        expect(findPost).toHaveBeenCalledWith(postId)
        expect(deletePostRepository).not.toHaveBeenCalled()
    })
})