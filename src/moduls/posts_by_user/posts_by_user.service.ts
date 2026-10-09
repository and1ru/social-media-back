import { CustomError } from "../../helpers/customError";
import { findUser } from "../friends/friends.repository";
import { postByUserRepository } from "./posts_by_user.repository";

export class PostsByUserService {
  // verificar que el usuario exista
  postByUser = async (userId: string) => {
    const user = await findUser(userId);
    if (!user) {
      return new CustomError("no user", 404);
    }

    return await postByUserRepository(userId);
  };
}
