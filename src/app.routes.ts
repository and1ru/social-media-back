// src/app.routes.ts
import { Router } from 'express'
import { RegisterController } from './register/register.controller.ts'
import { LoginController } from "./login/login.controller.ts"
import { CreatePostController } from './create_post/post.controller.ts'
import { GetPostsController } from './get_posts/get_posts.controller.ts'
import { SendRequestController } from './send_request/send_request.controller.ts'
import { RejectRequestController } from './reject_request/reject_request.controller.ts'
import { AcceptRequestController } from './accept_request/accept_request.controller.ts'
import { FriendsController } from './friends/friends.controller.ts'
import { AuthController } from './auth/Auth.controller.ts'

const routes = Router()

// Instancias de los controladores
const register = new RegisterController()
const login = new LoginController()
const createPost = new CreatePostController()
const get_posts = new GetPostsController()
const send_request = new SendRequestController()
const reject_request = new RejectRequestController()
const accept_request = new AcceptRequestController()
const friends = new FriendsController()
const authMe = new AuthController()

// Definición de rutas
routes.post("/register", register.register)
routes.post("/login", login.login)
routes.post("/create-post", createPost.post)
routes.get("/get-posts", get_posts.getPost)
routes.post("/send-request", send_request.sendRequest)
routes.put("/reject-request", reject_request.rejectRequest)
routes.put("/accept-request", accept_request.acceptRequest)
routes.get("/friends", friends.friends)
routes.get("/auth/me", authMe.auth)

// Exportamos el router principal
export { routes }