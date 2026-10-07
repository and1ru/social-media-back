import { myDb } from "../../helpers/pool.ts"

export const sendRequest = async (request:any) => {
    await myDb.collection("friend_requests").insertOne({
        userName:request.userName,
        sender: request.sender, 
        receiver: request.receiver,
        createdAt: request.createdAt,
        status: request.status
    })
}