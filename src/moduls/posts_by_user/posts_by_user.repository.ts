import { myDb } from "../../helpers/pool"

export const postByUserRepository = async (userId: string) => {
    return await myDb.collection("posts").find({ userId }).toArray()
}