import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRepo: ICarsImagesRepository
    ) {

    }
    async execute({ car_id, images_name }: IRequest) {
        images_name.map(async (image) => {
            await this.carsImageRepo.create(car_id, image);
        });

    }
}

export { UploadCarImagesUseCase };