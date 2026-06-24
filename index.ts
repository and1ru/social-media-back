import express from 'express'
import cors from 'cors'
import { routes } from './src/app.routes.ts'
import { errorMiddleware } from './src/middlewares/error.middleware.ts'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials:true }))
app.use(express.json())
app.use(cookieParser())
app.use(routes) 

// middleware de errores (SIEMPRE AL FINAL)
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000")
})