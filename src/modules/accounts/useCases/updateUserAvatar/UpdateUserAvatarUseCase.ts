import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string,
    avatar_file: string;
}

// adicionar coluna avatar na tabela de users
// refatorar usuario com coluna avatar
// configuracao upload multer
// criar regra de negocio do upload
// criar o controller
@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest) {
        const user = await this.userRepository.findById(user_id);

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
