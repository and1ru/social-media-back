import { describe, expect, vi, it } from "vitest";
import { myDb } from "../../../helpers/pool";
import { deletePostRepository } from "../delete_post.repository";
import { ObjectId } from "mongodb";

vi.mock("../../../helpers/pool", () => ({
    myDb: {
        collection: vi.fn()
    }
}))

describe("Repository DELETE /post/:postId", () => {
    const postId = new ObjectId()

    it("post deleted successfully", async () => {
        const deleteOne = vi.fn().mockResolvedValue({deleteCount:1})

        vi.mocked(myDb.collection).mockReturnValue({ deleteOne } as any )

        await deletePostRepository(postId.toString())

        expect(myDb.collection).toHaveBeenCalledWith("posts")
        expect(deleteOne).toHaveBeenCalledWith({ _id: postId })
    })
})