import { describe, expect, vi, it, beforeEach } from "vitest";
import { RegisterController } from "../register.controller";
import { RegisterService } from "../register.service";
import type { Request, Response, NextFunction } from "express";

describe("Controller POST /register", () => {
    let next: NextFunction
    let res: Response
    let service: RegisterService
    let controller: RegisterController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()

        service = {
            register: vi.fn()
        }

        controller = new RegisterController(service)
    })

    it("user registed", async () => {
        const req = {
            body: {
                name: "andres",
                email: "andres@gmail.com",
                password: "123456789"
            }
        } as Request

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        await controller.register(req, res, next)
        
        expect(service.register).toHaveBeenCalledWith({ name, email, password })
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({success:true, message:'usuario created'})
        expect(next).not.toHaveBeenCalled()
    })

    it("name is required", async () => {
        const req = {
            body: {
                email: "andres@gmail.com",
                password: "123456789"
            }
        } as Request

        await controller.register(req, res, next)

        expect(service.register).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("email is required", async () => {
        const req = {
            body: {
                name: "andres",
                password: "123456789"
            }
        } as Request

        await controller.register(req, res, next)
        
        expect(service.register).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("email is not valid", async () => {
        const req = {
            body: {
                name: "andres",
                email: "andres",
                password: "123456789"
            }
        } as Request

        await controller.register(req, res, next)
        
        expect(service.register).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("password is required", async () => {
        const req = {
            body: {
                name: "andres",
                email: "andres@gmail.com"
            }
        } as Request

        await controller.register(req, res, next)
        
        expect(service.register).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("password must be at least 8 length", async () => {
        const req = {
            body: {
                name: "andres",
                email: "andres@gmail.com",
                password: "1234"
            }
        } as Request

        await controller.register(req, res, next)
        
        expect(service.register).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("service error", async () => {
        const req = {
            body: {
                name: "andres",
                email: "andres@gmail.com",
                password: "123456789"
            }
        } as Request

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const error = new Error()
        vi.mocked(service.register).mockRejectedValue(error)
        
        await controller.register(req, res, next)
        
        expect(service.register).toHaveBeenCalledWith({ name, email, password })
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})