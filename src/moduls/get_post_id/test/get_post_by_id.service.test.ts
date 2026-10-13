import { describe, expect, vi, it, beforeEach } from "vitest";
import { PostByIdService } from "../get_post_by_id.service";
import { ObjectId } from "mongodb";
import { findPost } from "../../../shared/repositories/findPostById/findPostById.repository";

vi.mock("../../../shared/repositories/findPostById/findPostById.repository")

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