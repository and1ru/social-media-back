import { describe, it, expect, vi, beforeEach } from 'vitest'
import { commentPostRepository } from '../comment_post.repository'
import { myDb } from '../../../helpers/pool'

vi.mock("../../../helpers/pool", () => ({
    myDb:{
        collection: vi.fn()
    }
}))

describe("Repository POST /comment", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })
    
    it("insert comment successfully", async () => {
        const insertOne = vi.fn().mockResolvedValue({ 
            insertedId:"fake-id",
        })

        vi.mocked(myDb.collection).mockReturnValue({ insertOne } as any )

        await commentPostRepository("mocked PostId", "mocked userId", "comment", "userName")

        expect(myDb.collection).toHaveBeenCalledWith("comments")
        expect(insertOne).toHaveBeenCalledWith({ postId:"mocked PostId", userId:"mocked userId", comment: "comment", userName:"userName"})
    })
})