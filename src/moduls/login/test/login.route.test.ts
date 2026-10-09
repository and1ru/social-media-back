import request from 'supertest'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { app } from '../../../app'
import { myDb } from '../../../helpers/pool'
import { RegisterService } from '../../register/register.service'

describe("Route POST /login", () => {
    beforeEach(async () => {
        const service = new RegisterService()
        await service.register({ name: "andres", email: "andres@gmail.com", password: "123456789" })
    })

    afterEach(async () => {
        await myDb.collection("users").deleteOne({ email: "andres@gmail.com" })
    })

    it("login", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "andres@gmail.com", password: "123456789" })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: "login", success: true })
    })

    it("email is not valid", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "andres", password: "123456789" })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "error en los campos", success: false })
    })

    it("password no vaild", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "andres@gmail.com", password: "123" })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "error en los campos", success: false })
    })

    it("passwords not match", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "andres@gmail.com", password: "1234567890" })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "passwords did not match", success: false })
    })

    it("no found user with the email", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "felipe@gmail.com", password: "123456789" })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "no user", success: false })
    })

    it("too many requests", async () => {
        const response = await request(app)
            .post("/login")
            .send({ email: "felipe@gmail.com", password: "123456789" })

        expect(response.status).toBe(429)
        expect(response.body).toEqual({ message: "too many request, try again later", success: false })
    })
})