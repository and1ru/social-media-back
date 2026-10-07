import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool.ts"
import type { ResultUsers } from "../../shared/repositories/findUser.repository.ts"

export const findUsers = async (name:string, userId:string) => {
    return await myDb.collection<ResultUsers>("users").find({
        name: {
            $regex: name,
            $options: "i"
        },
        _id:{
            // $ne -> not equal
            // esto lo que hace es que saque de los resultados el id de quien esta haciendo la peticion
            $ne: new ObjectId(userId) 
        }
    },{projection:{_id:1, name:1}}).toArray()
}