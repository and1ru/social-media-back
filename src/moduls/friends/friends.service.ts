import { friends, friendsName } from "./friends.repository.ts"

export class FriendsService {
    friends = async (id:string) => {
        const data = await friends(id)
        const friendsArray = data.friends
        const arr = []

    for (let i = 0; i < friendsArray.length; i++) {
        const element = friendsArray[i];
        const user = await friendsName(element)

        if(!user){
            break
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