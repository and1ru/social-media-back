import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool.ts"

export const friends = async (id:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(id)})
}

export const findFriend = async (id:string) => {
    const result = await myDb.collection("users").findOne({_id: new ObjectId(id)})
    if(!result){
        throw new Error("no hay un usuario con ese id");
    }

    return result
}