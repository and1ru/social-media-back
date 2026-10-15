import type { NextFunction } from 'express'
import type { Server, Socket } from 'socket.io'
import { beforeEach, describe, it, vi } from 'vitest'

describe("Auth Socket Token", () => {
    let io: Server
    let socket: Socket
    let next: NextFunction

    beforeEach(() => {
        io = {
            use: vi.fn()
        } as Server

        socket = {
            handshake: {
                headers: {
                    cookie: ""
                }
            },
            data: {}
        }

        next = vi.fn()
        

    })

    it("Authenticated", () => {
        
    })
})