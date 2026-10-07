import { ObjectId } from 'mongodb'
import { myDb } from '../../helpers/pool.ts'

export interface ResultUsers {
    _id:ObjectId
    name:string;
    email:string;
    password:string;
    friends:ObjectId[]
}

export const findUserById = async (userId:string) => {
    return await myDb.collection<ResultUsers>("users").findOne({_id: new ObjectId(userId)})
}

export const findUserByEmail = async (email:string) => {
    return await myDb.collection("users").findOne({email})
}