import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool.ts"

export const friends = async (id:string) => {
    // se obtiene el usuario por el id
    const result = await myDb.collection("users").findOne({_id: new ObjectId(id)})
    // si no se encuentra un usuario entonce lanza un error
    if(!result){
        throw new Error("no se obtubo ningun usuario");
    }

    // obtener solo los ids del array
    const friendsArray = result.friends

    // obtener el nombre y id de cada amigo
    // 1. tener un array que contenga los objetos
    // el objeto es { id: objectId, name:string}

    const arr = []

    for (let i = 0; i < friendsArray.length; i++) {
        const element = friendsArray[i];
        const user = await myDb.collection("users").findOne({_id:element})
        if(!user){
            break
        }
        const newUser = {
            name: user.name,
            id: user._id
        }
        arr.push(newUser)
    }

    for (let i = 0; i < arr.length; i++) {
    }

    return result
}

export const friendsName = async (id:string) => {
    const result = await myDb.collection("users").findOne({_id: new ObjectId(id)})
    if(!result){
        throw new Error("no hay un usuario con ese id");
    }

    return result
}