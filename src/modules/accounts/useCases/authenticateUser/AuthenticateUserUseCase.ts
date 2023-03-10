import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject(UsersRepository)
        private usersResitory: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        //usuario existe 
        const user = await this.usersResitory.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);


        //senha esta correta
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }
        //gerar jwt
        const token = sign({}, "2391ebce81defe7db14c835641976129", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }