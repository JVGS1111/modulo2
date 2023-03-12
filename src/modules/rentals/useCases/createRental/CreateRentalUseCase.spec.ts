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
    const dayAdd24Hours = dayjs().add(2, "day").toDate();

    beforeEach(() => {
        rentalsReposInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsReposInMemory, dayjsDateProvider, carsRepositoryInMemory);
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "test",
            brand: "audi",
            category_id: "123",
            fine_amount: 40,
        })
        const rental = await createRentalUseCase.execute({
            user_id: "123456",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })
    it("should not be able to create a new rental if there another open to the same user", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "test",
            brand: "audi",
            category_id: "123",
            fine_amount: 40,
        })
        await createRentalUseCase.execute({
            user_id: "123456",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "123456",
                car_id: car.id,
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavaliable"))
    })
    it("should not be able to create a new rental if there another open to the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "test",
            brand: "audi",
            category_id: "123",
            fine_amount: 40,
        })
        await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: car.id,
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavaliable", 400))
    })
    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "1111",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("Minimun rental time is 24 hours"))
    })
})