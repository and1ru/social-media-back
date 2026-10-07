import { myDb } from "../../helpers/pool.ts"

interface getMessage {
    _id:string
}

export const getMessagesRepository = async (id:string) => {
    return await myDb.collection<getMessage>("messages").find({chatId:id}).toArray()
}