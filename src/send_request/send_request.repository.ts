import { myDb } from "../helpers/pool.ts"

export const sendRequest = async (request:any) => {
    return await myDb.collection("friend_requests").insertOne({
        sender: request.sender, 
        receiver: request.receiver,
        createdAt: request.createdAt,
        status: request.status
    })
}