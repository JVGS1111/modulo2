import { inject } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental does not existis!");
        }

        const dateNow = this.dateProvider.dateNow();
        //verificando dias de diaria
        let daily = this.dateProvider.comparteInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            //se emprestou por menos de 1 dia paga 1 dia
            daily = minimum_daily;
        }

        //pegando o numero de dias de aluguel esperado
        const delay = this.dateProvider.comparteInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 0) {
            //calculando multa se houver
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvaliable(car.id, true);

        return rental;
    }

}

export { DevolutionRentalUseCase };