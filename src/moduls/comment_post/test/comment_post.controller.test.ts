import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Response, NextFunction, Request } from 'express'
import { CommentPostController } from '../comment_post.controller'
import { CommentPostService } from '../comment_post.service'

describe("Controller POST /comment", () => {
    let res: Response
    let next: NextFunction
    let service: CommentPostService
    let controller: CommentPostController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn() as NextFunction

        service = {
            commetPost: vi.fn()
        } as CommentPostService

        controller = new CommentPostController(service)
    })

    it("post commented", async () => {
        const req = {
            user: {
                id: "mock id",
                name: "mock name",
            },
            body: {
                comment: "anything",
                postId: "mock id",
            }
        } as Request

        await controller.commetPost(req, res, next)

        const userId = req.user.id
        const userName = req.user.name
        const comment = req.body.comment
        const postId = req.body.postId

        expect(service.commetPost).toHaveBeenCalledWith(userId, comment, postId, userName)
        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: "post commented", success: true })
    })

    it("invalid comment", async () => {
        const req = {
            user: {
                id: "mock id",
                name: "mock name",
            },
            body: {
                postId: "mock id",
            }
        } as Request

        await controller.commetPost(req, res, next)

        expect(service.commetPost).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalledWith()
        expect(res.json).not.toHaveBeenCalledWith()
    })

    it("invalid postId", async () => {
        const req = {
            user: {
                id: "mock id",
                name: "mock name",
            },
            body: {
                comment: "comment",
            }
        } as Request

        await controller.commetPost(req, res, next)

        expect(service.commetPost).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalledWith()
        expect(res.json).not.toHaveBeenCalledWith()
    })

    it("error service", async () => {
        const req = {
            user: {
                id: "mock id",
                name: "mock name",
            },
            body: {
                comment: "anything",
                postId: "mock id",
            }
        } as Request

        const error = new Error("no post")

        vi.mocked(service.commetPost).mockRejectedValue(error)

        await controller.commetPost(req, res, next)

        const userId = req.user.id
        const userName = req.user.name
        const comment = req.body.comment
        const postId = req.body.postId

        expect(service.commetPost).toHaveBeenCalledWith(userId, comment, postId, userName)
        expect(next).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalledWith()
        expect(res.json).not.toHaveBeenCalledWith()
    })

})