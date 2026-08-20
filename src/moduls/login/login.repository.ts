import { myDb } from '../../helpers/pool.ts'

export const findUser = async (email:string) => {
    return await myDb.collection("users").findOne({email})
}