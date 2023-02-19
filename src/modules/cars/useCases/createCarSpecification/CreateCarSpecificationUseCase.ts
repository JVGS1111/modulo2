import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];

}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificarionRepository: ISpecificationsRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exists!");
        }
        console.log(specifications_id);

        const specifications = await this.specificarionRepository.findByIds(specifications_id);
        console.log(specifications);

        carExists.specifications = specifications;
        console.log(carExists);


        const newCar = await this.carsRepository.create(carExists);

        return newCar;
    }
}

export { CreateCarSpecificationUseCase };