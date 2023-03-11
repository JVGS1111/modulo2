
import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date
}
@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute({
        car_id,
        expected_return_date,
        user_id
    }: IRequest): Promise<Rental> {
        const minHour = 24;
        const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavaliable) {
            throw new AppError("Car is unavaliable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }
        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compare(dateNow, expected_return_date);

        if (compare < minHour) {
            throw new AppError("Minimun rental time is 24 hours");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            expected_return_date,
            user_id,

        })
        await this.carsRepository.updateAvaliable(car_id, false);

        return rental
    }
}

export { CreateRentalUseCase }