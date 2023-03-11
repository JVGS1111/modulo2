import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/In-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@errors/AppError";
import dayjs from "dayjs";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsReposInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsReposInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsReposInMemory, dayjsDateProvider, carsRepositoryInMemory);
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123456",
            car_id: "121212",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })
    it("should not be able to create a new rental if there another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "121212",
                expected_return_date: dayAdd24Hours
            });
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "121212",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to create a new rental if there another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "1111",
                expected_return_date: dayAdd24Hours
            });
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "1111",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "1111",
                expected_return_date: dayjs().toDate()
            });

        }).rejects.toBeInstanceOf(AppError)
    })
})