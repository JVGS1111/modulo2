import auth from '@config/auth'
import { AppError } from '@errors/AppError'
import { UsersTokensRepositoy } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepositoy")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {
        const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;
        const { email, sub } = verify(token, secret_refresh_token) as IPayload;
        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);
        const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token,
        })

        await this.usersTokensRepository.create({
            user_id: user_id,
            refresh_token: refresh_token,
            expires_date: refresh_token_expires_date
        })

        return refresh_token;
    }
}

export { RefreshTokenUseCase }