import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository) {
    }

    async execute(data: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(data.password, 8);
        data.password = passwordHash;
        await this.usersRepository.create(data);
    }
}

export { CreateUserUseCase }