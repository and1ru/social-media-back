import { describe, expect, vi, it, beforeEach } from "vitest";
import { PostByIdController } from "../get_post_by_id.controller";
import { PostByIdService } from "../get_post_by_id.service";
import type { NextFunction, Response, Request } from "express";
import { ObjectId } from "mongodb";

describe("Controller GET /post/:postId", () => {
    let controller: PostByIdController
    let service: PostByIdService
    let res: Response
    let next: NextFunction

    const postId = new ObjectId()

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Response

        next = vi.fn()

        service = {
            postById: vi.fn()
        } as PostByIdService

        controller = new PostByIdController(service)
    })

    it("got post by id", async () => {
        const req = {
            params: { postId: postId.toString() },
        } as Request

        const result = { _id:postId }
        vi.mocked(service.postById).mockResolvedValue(result)
        await controller.postById(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"got post", result, success:true})
        expect(next).not.toHaveBeenCalled()
    })

    it("postId is required", async () => {
        const req = {
            params: {},
        } as Request

        await controller.postById(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message:"error with postId", success:false})
        expect(next).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            params: { postId: postId.toString()},
        } as Request

        const error = new Error()
        vi.mocked(service.postById).mockRejectedValue(error)

        await controller.postById(req, res, next)
        
        expect(res.status).not.toHaveBeenCalledWith()
        expect(res.json).not.toHaveBeenCalledWith()
        expect(next).toHaveBeenCalled()
    })
})