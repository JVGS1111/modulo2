import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase"


let listCarsUseCase: ListAvaliableCarsUseCase
let carsRepoInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepoInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvaliableCarsUseCase(carsRepoInMemory);
    })
    it("Should be able to list all avaliable cars", async () => {
        const car = await carsRepoInMemory.create({
            "name": "Car1",
            "description": "car desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "car brend",
            "category_id": "category_id"
        })
        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    })
    it("should be able to list all avaliable cars by name", async () => {
        const car = await carsRepoInMemory.create({
            "name": "Car1",
            "description": "car1 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend1",
            "category_id": "category_id1"
        })
        await carsRepoInMemory.create({
            "name": "Car2",
            "description": "car2 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend2",
            "category_id": "category_id2"
        })
        const cars = await listCarsUseCase.execute({ name: "Car1" });

        expect(cars).toEqual([car]);
        expect(cars).toHaveLength(1);
    })
    it("should be able to list all avaliable cars by category", async () => {
        const car = await carsRepoInMemory.create({
            "name": "Car1",
            "description": "car1 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend1",
            "category_id": "category_id1"
        })
        await carsRepoInMemory.create({
            "name": "Car2",
            "description": "car2 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend2",
            "category_id": "category_id2"
        })
        const cars = await listCarsUseCase.execute({ category_id: "category_id1" });

        expect(cars).toEqual([car]);
        expect(cars).toHaveLength(1);
    })
    it("should be able to list all avaliable cars by brand", async () => {
        const car = await carsRepoInMemory.create({
            "name": "Car1",
            "description": "car1 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend1",
            "category_id": "category_id1"
        })
        await carsRepoInMemory.create({
            "name": "Car2",
            "description": "car2 desc",
            "daily_rate": 1,
            "license_plate": "DEF-1111",
            "fine_amount": 100,
            "brand": "brend2",
            "category_id": "category_id2"
        })
        const cars = await listCarsUseCase.execute({ brand: "brend1" });

        expect(cars).toEqual([car]);
        expect(cars).toHaveLength(1);
    })
})