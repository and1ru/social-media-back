import type { NextFunction, Request, Response } from "express"
import { findUsersSchema } from "./find_users.schema.ts";
import { FindUsersService } from "./find_users.service.ts";

export class FindUsersController {
    private service = new FindUsersService()

    findUsers = async (req:Request, res:Response, next:NextFunction) => {
        const data = findUsersSchema.safeParse(req.params)
        if(!data.success){
            return next(data.error)
        }

        try {
            const result = await this.service.findUsers(data.data.name)
            return res.status(200).json({message:"se obtuvieron los usuarios con el nombre", result})
        } catch (error) {
            next(error)
        }
    }
}