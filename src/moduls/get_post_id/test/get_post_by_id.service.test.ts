import { describe, expect, vi, it, beforeEach } from "vitest";
import { findPost } from "../../../shared/repositories/findPostById.repository";
import { PostByIdService } from "../get_post_by_id.service";
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findPostById.repository")

describe("Service GET /post/:postId", () => {
    let service: PostByIdService
    const postId = new ObjectId()

    beforeEach(() => {
        service = new PostByIdService()
    })
 
    it("got post by id", async () => {
        vi.mocked(findPost).mockResolvedValue({_id: postId})

        await service.postById(postId.toString())

        expect(findPost).toHaveBeenCalledWith(postId.toString())
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)
        await expect(service.postById(postId.toString())).rejects.toThrow("no post")
    })
})