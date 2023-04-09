import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@errors/AppError";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepoInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepoInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepoInMemory,
            dateProvider,
            mailProvider
        );

    })
    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "emailteste@test.com",
            name: "Test recuperar",
            password: "123456"
        })

        await sendForgotPasswordMailUseCase.execute("emailteste@test.com");

        expect(sendMail).toHaveBeenCalled();
    })

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("emailerror@test.com")
        ).rejects.toEqual(new AppError("User does not exists!"));

    })

    it("should be able to create an users token", async () => {
        const generateTokensMail = spyOn(usersTokensRepoInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "444444",
            email: "email@test.com",
            name: "Test recuperar",
            password: "123456"
        })

        await sendForgotPasswordMailUseCase.execute("email@test.com");

        expect(generateTokensMail).toBeCalled()

    })
})