import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memeory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memeory/SpecificationInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepoInMemory: CarsRepositoryInMemory;
let specificationRepoInMemory: SpecificationsRepositoryInMemory
describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepoInMemory = new CarsRepositoryInMemory();
        specificationRepoInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepoInMemory, specificationRepoInMemory);
    })
    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepoInMemory.create({
            name: "name car",
            description: "description car",
            daily_rate: 100,
            license_plate: "abc-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
        const specifications_id = [];
        const specification = await specificationRepoInMemory.create({
            description: "test",
            name: "test"
        })
        specifications_id.push(specification.id);

        const newCar = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(newCar).toHaveProperty("specifications");
        expect(newCar.specifications.length).toBe(1);
    })
    it("should not be able to add a new specification if car does not exisits", () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["4321", "5555"];
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError)

    })
})