import { CustomError } from "../../helpers/customError.ts";
import { findFriends, findUser } from "./friends.repository.ts";

export class FriendsService {
  friends = async (id: string) => {
    // obtiene el user
    const user = await findUser(id);
    if (!user) {
      throw new CustomError("no user", 404);
    }

    const friends = await findFriends(user.friends);

    return friends.map((friend) => ({
      id: friend._id,
      name: friend.name,
    }));
  };
}
