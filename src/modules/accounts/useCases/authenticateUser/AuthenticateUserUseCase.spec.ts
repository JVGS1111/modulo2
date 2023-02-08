import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: 'A',
            email: 'user@test.com',
            password: '123456789a',
            name: 'User Test',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: 'user@test.com',
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it("Should not be able to authenticate if user no exisit", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: "123456",
            })

        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able to authenticate with incorrect password", () => {

        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: 'A',
                email: 'user@test.com',
                password: '123456789a',
                name: 'User Test',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorectPassword",
            });

        }).rejects.toBeInstanceOf(AppError)
    })
})