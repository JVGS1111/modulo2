import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDto";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, driver_license, username }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            driver_license,
            password,
        });
        await this.repository.save(user);
    }
}

export { UsersRepository }