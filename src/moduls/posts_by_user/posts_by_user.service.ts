import { CustomError } from "../../helpers/customError";
import { findUserById } from "../../shared/repositories/findUser/findUser.repository";
import { postByUserRepository } from "./posts_by_user.repository";

export class PostsByUserService {
  postByUser = async (userId: string) => {
    const user = await findUserById(userId);
    if (!user) {
      throw new CustomError("no user", 404);
    }

    return await postByUserRepository(userId);
  };
}