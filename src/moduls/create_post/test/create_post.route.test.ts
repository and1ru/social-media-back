import {describe, vi, expect, it} from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { generateTokenTest } from '../../../helpers/generateTokenTest'
import { tokenTest } from '../../../helpers/tokenTest'

describe("Controller POST /create-post", () => {
    it("post created", async () => {
        const response = await request(app)
            .post("/create-post")
            .set("Cookie", generateTokenTest())
            .send({ content: "mocked content"})

        expect(response.status).toBe(201)
        expect(response.body).toEqual({ message: "post created", success:true })
    })

    it("content is required", async () => {
        const response = await request(app)
            .post("/create-post")
            .set("Cookie", generateTokenTest())

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "error en los campos", success:false })
    })

    tokenTest("/create-post", "post")
})