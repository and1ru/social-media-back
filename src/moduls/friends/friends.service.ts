import { CustomError } from "../../helpers/custom-error.ts";
import { findFriend, friends } from "./friends.repository.ts"

export class FriendsService {
    friends = async (id: string) => {
        // obtiene el user
        const user = await friends(id)
        if (!user) {
            throw new CustomError("no user", 404);
        }

        // obtiene el array de amigos
        const friendsArray = user.friends
        const arr = []

        for (let i = 0; i < friendsArray.length; i++) {
            const friend = friendsArray[i];
            const user = await findFriend(friend)

            if (!user) {
                throw new CustomError("no user", 404);
            }

            const newUser = {
                name: user.name,
                id: user._id
            }
            arr.push(newUser)
        }

        return arr
    }
}