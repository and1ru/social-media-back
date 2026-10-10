import { describe, expect, vi, it, beforeEach, afterEach } from "vitest";
import Request from 'supertest'
import { app } from "../../../app";
import { generateTokenTest } from "../../../helpers/generateTokenTest";
import { tokenTest } from "../../../helpers/tokenTest";
import { myDb } from "../../../helpers/pool";
import { ObjectId, type Document, type InsertOneResult } from "mongodb";
import { generarToken } from "../../../helpers/generateToken";

describe("Route DELETE /post/:postId", () => {
    let post: InsertOneResult<Document>
    let userId = new ObjectId().toString()

    beforeEach(async () => {
        post = await myDb.collection("posts").insertOne({ content: "mocked", userId });
    })

    afterEach(async () => {
        await myDb.collection("posts").deleteOne({ _id: post.insertedId });
    })

    it("post deleted", async () => {
        const response = await Request(app).delete(`/post/${post.insertedId.toString()}`).set("Cookie", `token=${generarToken({ name: "mocked name", id: userId })}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: "post deleted", success: true })
    })

    it("postId is not valid", async () => {
        const response = await Request(app).delete(`/post/invalid-postId}`).set("Cookie", `token=${generarToken({ name: "mocked name", id: userId })}`)

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "error with postId", success: false })
    })

    it("post does not exist", async () => {
        const response = await Request(app).delete(`/post/${new ObjectId().toString()}`).set("Cookie", `token=${generarToken({ name: "mocked name", id: userId })}`)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message:"no post", success:false })
    })

    it("user cannot delete post", async () => {
        const response = await Request(app).delete(`/post/${post.insertedId.toString()}`).set("Cookie", generateTokenTest())

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: "you can't delete this post", success:false })
    })

    tokenTest("/post/:postId", "delete")
})