import {describe, vi, expect, it} from 'vitest'
import { myDb } from '../../../helpers/pool'
import { createPost } from '../create_post.repository'

vi.mock("../../../helpers/pool", () => ({
    myDb: { collection: vi.fn() }
}))

describe("Repository POST /create-post", () => {
    it("post created successfully", async () => {
        const insertOne = vi.fn().mockResolvedValue({ insertedId: "fake-id"})

        vi.mocked(myDb.collection).mockReturnValue({ insertOne } as any )

        await createPost({ content: "mocked content", fecha: "fake date", name: "fake name", userId: "fake userId"})

        expect(myDb.collection).toHaveBeenCalledWith("posts")
        expect(insertOne).toHaveBeenCalledWith({ content: "mocked content", fecha: "fake date", name: "fake name", userId: "fake userId"})
    })
})