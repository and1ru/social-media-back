import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { myDb } from '../../../helpers/pool'
import { ObjectId, type Document, type InsertOneResult } from 'mongodb'
import { generateTokenTest } from '../../../helpers/generateTokenTest'
import { tokenTest } from '../../../helpers/tokenTest'

describe("Route PUT /accept-request", () => {
    let result:InsertOneResult<Document>

    beforeEach( async () => {
        result = await myDb.collection("friend_requests").insertOne({content:"no importa"})
    })

    afterEach( async () => {
        await myDb.collection("friend_requests").deleteOne({_id: result.insertedId})
    })

    it("request accepted", async () => {
        const response = await request(app)
            .put("/accept-request")
            .set("Cookie", generateTokenTest())
            .send({ id: result.insertedId.toString() })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({message:"request accepted", success:true})
    })

    it("id is required", async () => {
        const response = await request(app)
            .put("/accept-request")
            .set("Cookie", generateTokenTest())

        expect(response.status).toBe(400)
        expect(response.body).toEqual({message:"error en los campos", success:false})
    })

    it("dit not find request", async () => {
        const response = await request(app)
            .put("/accept-request")
            .set("Cookie", generateTokenTest())
            .send({ id: new ObjectId() })

        expect(response.status).toBe(404)
        expect(response.body).toEqual({message:"no request", success:false})
    })
    
    tokenTest("/accept-request", "put")
})