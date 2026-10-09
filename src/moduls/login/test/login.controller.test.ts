import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginController } from '../login.controller'
import { LoginService } from '../login.service'
import type { Request, Response, NextFunction } from 'express'

describe("controller POST /login", () => {
    let res: Response
    let next: NextFunction
    let service: LoginService
    let controller: LoginController

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            cookie: vi.fn()
        } as unknown as Response

        next = vi.fn() as NextFunction

        service = {
            login: vi.fn()
        } as LoginService

        controller = new LoginController(service)
    })

    it("success login", async () => {
        const req = {
            body: {
                email: "andres@gmail.com",
                password: "1234567890"
            }
        } as Request

        vi.mocked(service.login).mockResolvedValue("token")

        await controller.login(req, res, next)

        expect(res.cookie).toHaveBeenCalledWith("token", "token", {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false
        })
        expect(service.login).toHaveBeenCalledWith("andres@gmail.com", "1234567890")
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "login", success: true })
        expect(next).not.toHaveBeenCalled()
    })

    it("not enough character in password", async () => {
        const req = {
            body: {
                email: "andres@gmail.com",
                password: "1234567"
            }
        } as Request

        await controller.login(req, res, next)

        expect(res.cookie).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("email is not valid", async () => {
        const req = {
            body: {
                email: "andres",
                password: "1234567890"
            }
        } as Request

        await controller.login(req, res, next)

        expect(res.cookie).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("service throws an error", async () => {
        const req = {
            body: {
                email: "andres@gmail.com",
                password: "1234567890"
            }
        } as Request

        const error = new Error("something went wrong")

        vi.mocked(service.login).mockRejectedValue(error)

        await controller.login(req, res, next)

        expect(res.cookie).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})