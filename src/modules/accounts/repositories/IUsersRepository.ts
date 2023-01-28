import { ICreateUserDTO } from "../dtos/ICreateUserDto";


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;

}

export { IUsersRepository }