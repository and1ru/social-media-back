import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetPostsService } from "../get_posts.service";
import { getPosts } from "../get_posts.repository";
import { ObjectId } from "mongodb";

vi.mock("../get_posts.repository")

describe("Service GET /get-posts", () => {
    let service: GetPostsService

    beforeEach(() => {
        service = new GetPostsService()
    })

    it("got posts", async () => {
        vi.mocked(getPosts).mockResolvedValue([{_id: new ObjectId()}])

        await service.getPost()

        expect(getPosts).toHaveBeenCalled()
    })
})