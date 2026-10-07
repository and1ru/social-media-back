import { myDb } from "../../helpers/pool.ts"
import { ObjectId } from "mongodb"

export const rejectRequest = async (id:string) => {
    return await myDb.collection("friend_requests").deleteOne({_id: new ObjectId(id)})
}