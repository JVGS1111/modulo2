import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memeory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepoInMemory: CarsRepositoryInMemory;

describe("Create car", () => {

    beforeEach(() => {
        carsRepoInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepoInMemory);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name car",
            description: "description car",
            daily_rate: 100,
            license_plate: "abc-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
        expect(car).toBeInstanceOf(Car);
        expect(car).toHaveProperty("id");
    });

    it("should be able to create a new car with avaliable 'true' by default", async () => {
        const car = await createCarUseCase.execute({
            name: "car avaliable",
            description: "description car",
            daily_rate: 100,
            license_plate: "abc-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car.avaliable).toBe(true);

    });

    it("Should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car1",
                description: "description car",
                daily_rate: 100,
                license_plate: "abc-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
            await createCarUseCase.execute({
                name: "car2",
                description: "description car",
                daily_rate: 100,
                license_plate: "abc-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})