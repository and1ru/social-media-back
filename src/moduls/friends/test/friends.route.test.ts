import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { tokenTest } from "../../../helpers/tokenTest";
import Request from 'supertest'
import { app } from "../../../app";
import { ObjectId } from "mongodb";
import { myDb } from "../../../helpers/pool";
import { generarToken } from "../../../helpers/generateToken";

describe("Route GET /friends", () => {
    const friend1 = new ObjectId()
    const friend2 = new ObjectId()
    const userId = new ObjectId()

    beforeEach( async () => {
        await myDb.collection("users").insertMany([{_id:friend1, name:"mocked name1"}, {_id:friend2, name:"mocked name2"}, {_id:userId, name:"mocked name3", friends:[friend1.toString(), friend2.toString()]}])
    })

    afterEach(async () => {
        await myDb.collection("users").deleteOne({ _id:friend1})
        await myDb.collection("users").deleteOne({ _id:friend2})
        await myDb.collection("users").deleteOne({ _id:userId})
    })

    it("found friends", async () => {
        const response = await Request(app).get("/friends").set("Cookie", `token=${generarToken({ id: userId.toString(), name: "mocked name"})}`)

        const result = [{id:friend1.toString(), name:"mocked name1"}, {id:friend2.toString(), name:"mocked name2"},]

        expect(response.status).toBe(200)
        expect(response.body).toEqual({message:"got friends", result, success:true})
    })

    it("did not find user", async () => {
        const response = await Request(app).get("/friends").set("Cookie", `token=${generarToken({ id: new ObjectId().toString(), name: "mocked name"})}`)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({message:"no user", success:false})
    })

    tokenTest("/friends", "get")
})