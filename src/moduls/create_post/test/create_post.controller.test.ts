import {describe, vi, expect, it, beforeEach} from 'vitest'
import type { Response, Request, NextFunction, request } from 'express'
import { CreatePostController } from '../create_post.controller'
import { CreatePostService } from '../create_post.service'

describe("Controller POST /create-post", () => {
    let res: Response
    let next: NextFunction
    let service: CreatePostService
    let controller: CreatePostController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()
        service = {
            createPost: vi.fn()
        }

        controller = new CreatePostController(service)
    })

    it("post created", async () => {
        const req = {
            body: {
                content: "mocked content"
            },
            user:{
                name: "mocked name",
                id: "mocked id"
            }
        } as Request

        const content = req.body.content
        const userName = req.user.name
        const userId = req.user.id

        vi.mocked(service.createPost)

        await controller.post(req, res, next)

        expect(service.createPost).toHaveBeenCalledWith(content, userId, userName)
        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: "post created", success:true })
    })

    it("content is required", async () => {
        const req = {
            user:{
                name: "mocked name",
                id: "mocked id"
            }
        } as Request

        await controller.post(req, res, next)

        expect(service.createPost).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })
})