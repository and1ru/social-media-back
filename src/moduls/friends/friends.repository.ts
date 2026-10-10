import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool.ts"

export const findFriends = async (friendsId:string[]) => {
    return await myDb.collection("users").find({
        _id:{
            $in: friendsId.map(id => new ObjectId(id))
        }
    }).toArray()
}