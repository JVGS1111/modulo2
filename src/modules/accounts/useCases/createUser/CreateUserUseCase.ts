import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UsersRepository } from "../../implementations/UsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject(UsersRepository)
        private usersRepository: UsersRepository) {
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