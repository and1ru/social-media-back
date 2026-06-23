import express from 'express'
import cors from 'cors'
import { routes } from './src/app.routes.ts'

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(routes) 

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000")
})