import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "2391ebce81defe7db14c835641976129") as IPayload;
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists!", 401)
        }
        req.user = {
            id: user_id
        }
        next();
    } catch (error) {
        console.log(error);

        throw new AppError("Invalid token!", 401);
    }



}