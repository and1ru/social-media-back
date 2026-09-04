import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool.ts"

interface ResultUsers {
    _id:ObjectId
    name:string;
    email:string;
    password:string;
    friends:ObjectId[]
}

export const findUser = async (userId:string) => {
    return await myDb.collection<ResultUsers>("users").findOne({_id: new ObjectId(userId)})
}

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

export const findRequest = async (sender:string, receiver:string) => {
    return await myDb.collection("friend_requests").findOne({sender, receiver})
}