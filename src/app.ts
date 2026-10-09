import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { routes } from "./app.routes.ts"
import { errorMiddleware } from "./middlewares/errorMiddleware.ts"

export const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)

app.use(express.json())
app.use(cookieParser())

app.use(routes)

// SIEMPRE AL FINAL
app.use(errorMiddleware)