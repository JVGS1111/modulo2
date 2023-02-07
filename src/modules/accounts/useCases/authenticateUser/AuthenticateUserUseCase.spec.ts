import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        authUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });
    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "test@email.com",
            password: "123456",
            name: "test user",
        }

        await createUserUseCase.execute(user);

        const response = await authUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(response).toHaveProperty('token');
    })

})