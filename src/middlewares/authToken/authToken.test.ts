import { beforeEach, describe, it, vi, expect } from 'vitest'
import { AuthToken } from './authToken'
import type { NextFunction, Request, Response } from 'express'
import { generarToken } from '../../helpers/generateToken'

describe("Auth token", () => {
    let res: Response
    let next: NextFunction

    beforeEach(() => {
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response

        next = vi.fn()
    })

    it("Authenticated", () => {
        const req = {
            cookies: {
                token: generarToken({ id: "fake id", name: "fake name"})
            }
        } as unknown as Request

        AuthToken(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it("there is no token", () => {
        const req = {
            cookies: {}
        } as Request

        AuthToken(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:"no token", success:false})
    })

    it("invalid token", () => {
        const req = {
            cookies: {
                token: "fake token"
            }
        } as unknown as Request

        AuthToken(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: "expired or invalid token", success: false })
    })
})