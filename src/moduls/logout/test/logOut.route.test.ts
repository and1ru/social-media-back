import { describe, expect, it } from "vitest";
import Request from 'supertest'
import { app } from "../../../app";

describe("Route POST /log-out", () => {
    it("loged out", async () => {
        const response = await Request(app).post("/log-out")

        expect(response.status).toBe(200)
        expect(response.body).toEqual({status:true, message:"loged out"})
    })
})