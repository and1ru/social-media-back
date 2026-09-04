import type { NextFunction, Request, Response } from "express"
import { findUsersSchema } from "./find_users.schema.ts";
import { FindUsersService } from "./find_users.service.ts";

export class FindUsersController {
    constructor( private service: FindUsersService){}
    
    findUsers = async (req:Request, res:Response, next:NextFunction) => {
        const data = findUsersSchema.safeParse(req.params)
        const { id } = req.user

        if(!data.success){
            return next(data.error)
        }

        if(!id){
            return res.status(400).json({message:"problem with the id", success:false})
        }

        try {
            const result = await this.service.findUsers(data.data.name, id)
            return res.status(200).json({message:"se obtuvieron los usuarios con el nombre", success:true, result})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}