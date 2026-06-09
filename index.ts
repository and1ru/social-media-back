import express from 'express'
import { Router } from 'express'
import { RegisterController } from './src/register/register.controller.ts'
import { LoginController } from "./src/login/login.controller.ts"
const app = express()
app.use(express.json())
const routes = Router()
const register = new RegisterController()
const login = new LoginController()

routes.get("/", (req, res) => {
    res.send("todo funciona")
})

routes.post("/register", register.register)
routes.post("/login", login.login)

app.use(routes)

app.listen(3000, () => {
    console.log("escuchando en el puerto 3000")
})