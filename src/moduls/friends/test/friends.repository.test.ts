import { describe, it, vi } from 'vitest'
import { myDb } from '../../../helpers/pool'
import { findFriends } from '../friends.repository'

vi.mock("../../../helpers/pool", () => ({
    myDb: {
        collection: vi.fn()
    }
}))

describe("Repository GET /friends", () => {
    it("got friends successfully", () => {
        const find = vi.fn().mockResolvedValue([])
    })
})