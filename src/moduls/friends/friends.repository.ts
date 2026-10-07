import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool.ts"

export const findUser = async (id:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(id)})
}

export const findFriends = async (friendsId:string[]) => {
    return await myDb.collection("users").find({
        _id:{
            $in: friendsId.map(id => new ObjectId(id))
        }
    }).toArray()
}