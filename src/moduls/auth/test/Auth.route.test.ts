import { describe, expect, it } from 'vitest'
import { tokenTest } from '../../../helpers/tokenTest'
import request from 'supertest'
import { app } from '../../../app'
import { generateTokenTest } from '../../../helpers/generateTokenTest'

describe("Route GET /me", () => {
    it("", async () => {
        const response = await request(app)
            .get("/me")
            .set("Cookie", generateTokenTest())

        expect(response.status).toBe(200)
        const result = {
            name: "mocked name",
            userId: "mocked id"
        }

        expect(response.body).toEqual({success: true, message: "authenticated", result})
    })

    tokenTest("/me", "get")
})