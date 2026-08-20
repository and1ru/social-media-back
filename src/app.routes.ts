// src/app.routes.ts
import { Router } from "express";
import { LogOutController } from "./moduls/logout/logOut.controller.ts";

import acceptRequest from "./moduls/accept_request/accept_request.route.ts";
import createPost from './moduls/create_post/create_post.route.ts'
import deletePost from './moduls/delete_post/delete_post.route.ts'
import findUsers from './moduls/find_users/find_users.route.ts'
import friends from './moduls/friends/friends.route.ts'
import getMessages from "./moduls/get_message/get_message.route.ts";
import getPosts from './moduls/get_posts/get_posts.route.ts'
import getRequest from './moduls/get_requests/get_requests.route.ts'
import login from './moduls/login/login.route.ts'
import register from './moduls/register/register.route.ts'
import rejectRequest from './moduls/reject_request/reject_request.route.ts'
import sendRequest from './moduls/send_request/send_request.route.ts'
import auth from './moduls/auth/Auth.route.ts'
import comments from './moduls/get_post_comment/get_post_comment.route.ts'
import postComments from './moduls/comment_post/comment_post.route.ts'
import postByUser from './moduls/posts_by_user/posts_by_user.route.ts'
import postById from './moduls/get_post_id/get_post_by_id.route.ts'
import like from './moduls/like/like.route.ts'
import getLikes from './moduls/get_likes/get_like.route.ts'
import status from './moduls/user_connected/user_connected.route.ts'

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
routes.use(postById)
routes.use(like)
routes.use(getLikes)
routes.use(status)

// Exportamos el router principal
export { routes };