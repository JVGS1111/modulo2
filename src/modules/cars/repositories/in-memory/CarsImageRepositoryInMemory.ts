import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "../ICarsImagesRepository";

class CarsImageRepositoryInMemory implements ICarsImagesRepository {
    async create(car_id: string, image_name: string): Promise<CarImage> {
        return
    }
}