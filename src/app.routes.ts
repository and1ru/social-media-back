// src/app.routes.ts
import { Router } from "express";
import { LogOutController } from "./logout/logOut.controller.ts";

import acceptRequest from "./accept_request/accept_request.route.ts";
import createPost from './create_post/create_post.route.ts'
import deletePost from './delete_post/delete_post.route.ts'
import findUsers from './find_users/find_users.route.ts'
import friends from './friends/friends.route.ts'
import getMessages from "./get_message/get_message.route.ts";
import getPosts from './get_posts/get_posts.route.ts'
import getRequest from './get_requests/get_requests.route.ts'
import login from './login/login.route.ts'
import register from './register/register.route.ts'
import rejectRequest from './reject_request/reject_request.route.ts'
import sendRequest from './send_request/send_request.route.ts'
import auth from './auth/Auth.route.ts'
import comments from './get_post_comment/get_post_comment.route.ts'
import postComments from './comment_post/comment_post.route.ts'
import postByUser from './posts_by_user/posts_by_user.route.ts'

const routes = Router();

// Instancias de los controladores
const logOut = new LogOutController();

// Definición de rutas
routes.post("/log-out", logOut.logOut);

routes.use(acceptRequest);
routes.use(createPost)
routes.use(deletePost)
routes.use(findUsers)
routes.use(friends)
routes.use(getMessages);
routes.use(getPosts)
routes.use(getRequest)
routes.use(login)
routes.use(register)
routes.use(rejectRequest)
routes.use(sendRequest)
routes.use(auth)
routes.use(comments)
routes.use(postComments)
routes.use(postByUser)

// Exportamos el router principal
export { routes };