import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetPostsController } from "../get_posts.controller";
import type { GetPostsService } from "../get_posts.service";
import type { NextFunction, Response, Request } from "express";
import { ObjectId } from "mongodb";

describe("Controller GET /get-posts", () => {
    let controller: GetPostsController
    let service: GetPostsService
    let res: Response
    let next: NextFunction

    beforeEach(() => {
        service = {
            getPost: vi.fn()
        }

        controller = new GetPostsController(service)

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as Response

        next = vi.fn()
    })

    it("got posts", async () => {
        const req = {} as Request

        const result = [{_id: new ObjectId()}]

        vi.mocked(service.getPost).mockResolvedValue(result)
        await controller.getPost(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"got posts", result, success:true})
        expect(next).not.toHaveBeenCalled()
    })
})