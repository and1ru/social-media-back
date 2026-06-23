import express from 'express'
import cors from 'cors'

import { Router } from 'express'
import { RegisterController } from './src/register/register.controller.ts'
import { LoginController } from "./src/login/login.controller.ts"
import { CreatePostController } from './src/create_post/post.controller.ts'
import { GetPostsController } from './src/get_posts/get_posts.controller.ts'
import { SendRequestController } from './src/send_request/send_request.controller.ts'
import { RejectRequestController } from './src/reject_request/reject_request.controller.ts'
import { AcceptRequestController } from './src/accept_request/accept_request.controller.ts'
import { FriendsController } from './src/friends/friends.controller.ts'

const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
const routes = Router()
const register = new RegisterController()
const login = new LoginController()
const createPost = new CreatePostController()
const get_posts = new GetPostsController()
const send_request = new SendRequestController()
const reject_request = new RejectRequestController()
const accept_request = new AcceptRequestController()
const friends = new FriendsController()

routes.post("/register", register.register)
routes.post("/login", login.login)
routes.post("/create-post", createPost.post)
routes.get("/get-posts", get_posts.getPost)
routes.post("/send-request", send_request.sendRequest)
routes.put("/reject-request", reject_request.rejectRequest)
routes.put("/accept-request", accept_request.acceptRequest)
routes.get("/friends", friends.friends)

app.use(routes)

app.listen(3000, () => {
    console.log("escuchando en el puerto 3000")
})