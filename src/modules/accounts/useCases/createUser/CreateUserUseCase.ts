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
        await this.usersRepository.create(data);
    }
}

export { CreateUserUseCase }