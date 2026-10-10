import { describe, expect, vi, it, beforeEach } from "vitest";
import { findPost } from "../../../shared/repositories/findPostById.repository";
import { getComments, countComments } from "../get_post_comment.repository";
import { GetPostCommentsService } from "../get_post_comment.service";
import { ObjectId } from "mongodb";

vi.mock("../../../shared/repositories/findPostById.repository")
vi.mock("../get_post_comment.repository")

describe("Service GET /comments/:postId", () => {
    let service: GetPostCommentsService
    const postId = new ObjectId()
    const userId = new ObjectId()

    beforeEach(() => {
        vi.clearAllMocks()
        service = new GetPostCommentsService()
    })

    it("got post comments", async () => {
        vi.mocked(findPost).mockResolvedValue({ _id:postId, userId, content:"mocked content" })
        vi.mocked(getComments).mockResolvedValue([{_id: new ObjectId()}])
        vi.mocked(countComments).mockResolvedValue(10)

        await service.getPostComments(postId.toString())

        expect(findPost).toHaveBeenCalledWith(postId.toString())
        expect(getComments).toHaveBeenCalledWith(postId.toString())
        expect(countComments).toHaveBeenCalledWith(postId.toString())
    })

    it("did not find post", async () => {
        vi.mocked(findPost).mockResolvedValue(null)

        await expect(service.getPostComments(postId.toString())).rejects.toThrow("no post")

        expect(findPost).toHaveBeenCalledWith(postId.toString())
        expect(getComments).not.toHaveBeenCalled()
        expect(countComments).not.toHaveBeenCalled()
    })
})