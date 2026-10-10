import { ObjectId } from 'mongodb'
import { myDb } from '../../../helpers/pool';

export interface ResultUsers {
    _id:ObjectId
    name:string;
    email:string;
    password:string;
    friends: string[]
}

export const findUserById = async (userId:string) => {
    return await myDb.collection<ResultUsers>("users").findOne({_id: new ObjectId(userId)})
}

export const findUserByEmail = async (email:string) => {
    return await myDb.collection<ResultUsers>("users").findOne({email})
}