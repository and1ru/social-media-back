import { describe, expect, vi, it, beforeEach } from "vitest";
import { GetPostCommentsController } from "../get_post_comment.controller";
import { GetPostCommentsService } from "../get_post_comment.service";
import type { NextFunction, Response, Request } from "express";
import { ObjectId } from "mongodb";

describe("Controller GET /comments/:postId", () => {
    let res: Response;
    let next: NextFunction
    let service: GetPostCommentsService
    let controller: GetPostCommentsController
    const postId = new ObjectId()
    const userId = new ObjectId()

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()

        service = {
            getPostComments: vi.fn()
        }

        controller = new GetPostCommentsController(service)
    })

    it("got post comments", async () => {
        const req = {
            params: {postId: postId.toString()},
            user: {
                id: userId,
                name: "mocked name"
            }
        } as unknown as Request

        const response = {
            commentCount: 1,
            comments: [{_id:new ObjectId(), userId:new ObjectId(), content:"mocked comment"}]
        }

        vi.mocked(service.getPostComments).mockResolvedValue(response)

        await controller.getPostComments(req, res, next)

        expect(service.getPostComments).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message:"se obtubieron los comentarios", commentCount: response.commentCount, comments: response.comments, success:true })
        expect(next).not.toHaveBeenCalled()
    })

    it("postId is required", async () => {
        const req = {
            params: {},
            user: {
                id: userId,
                name: "mocked name"
            }
        } as unknown as Request

        await controller.getPostComments(req, res, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(service.getPostComments).not.toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            params: {postId:postId.toString()},
            user: {
                id: userId,
                name: "mocked name"
            }
        } as unknown as Request

        const error = new Error()
        vi.mocked(service.getPostComments).mockRejectedValue(error)

        await controller.getPostComments(req, res, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(service.getPostComments).toHaveBeenCalled()
    })
})