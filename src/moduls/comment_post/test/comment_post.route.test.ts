import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { tokenTest } from '../../../helpers/tokenTest'
import { generateTokenTest } from '../../../helpers/generateTokenTest'
import { ObjectId, type Document, type InsertOneResult } from 'mongodb'
import { createPost } from '../../create_post/create_post.repository'
import { myDb } from '../../../helpers/pool'

describe("Route POST /comment", () => {
    let post:InsertOneResult<Document>

    beforeAll(async () => {
        post = await createPost({ content: "mocked", fecha:"mocked data", name: "mocked name", userId:""})
    })

    afterAll(async () => {
        await myDb.collection("posts").deleteOne({_id: post.insertedId})
    })

    it("post commented", async () => {
        const response = await request(app)
            .post("/comment")
            .set("Cookie", generateTokenTest())
            .send({ comment:"mocked comment", postId:post.insertedId })

        expect(response.status).toBe(201)
        expect(response.body).toEqual({message:"post commented", success:true})
    })

    it("postId is required", async () => {
        const response = await request(app)
            .post("/comment")
            .set("Cookie", generateTokenTest())
            .send({ comment:"mock comment"})

        expect(response.status).toBe(400)
        expect(response.body).toEqual({message:"error en los campos", success:false})
    })

    it("comment is required", async () => {
        const response = await request(app)
            .post("/comment")
            .set("Cookie", generateTokenTest())
            .send({postId:"mock postId"})

        expect(response.status).toBe(400)
        expect(response.body).toEqual({message:"error en los campos", success:false})
    })

    it("did not found post", async () => {
        const response = await request(app)
            .post("/comment")
            .set("Cookie", generateTokenTest())
            .send({ comment: "mocked comment", postId: new ObjectId()})

        expect(response.status).toBe(404)
        expect(response.body).toEqual({message:"no post", success:false})
    })

    tokenTest("/comment", "post")
})