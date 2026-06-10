import express from 'express'
import { Router } from 'express'
import { RegisterController } from './src/register/register.controller.ts'
import { LoginController } from "./src/login/login.controller.ts"
import { CreatePostController } from './src/create_post/post.controller.ts'
import { GetPostsController } from './src/get_posts/get_posts.controller.ts'
const app = express()
app.use(express.json())
const routes = Router()
const register = new RegisterController()
const login = new LoginController()
const createPost = new CreatePostController()
const get_posts = new GetPostsController()

routes.get("/", (req, res) => {
    res.send("todo funciona")
})

routes.post("/register", register.register)
routes.post("/login", login.login)
routes.post("/create-post", createPost.post)
routes.get("/get-posts", get_posts.getPost)

app.use(routes)

app.listen(3000, () => {
    console.log("escuchando en el puerto 3000")
})