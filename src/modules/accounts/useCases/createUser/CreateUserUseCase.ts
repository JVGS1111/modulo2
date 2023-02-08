import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDto";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        try {
            await this.usersRepository.create({
                name,
                email,
                driver_license,
                password: passwordHash,
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export { CreateUserUseCase }