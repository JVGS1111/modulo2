import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) { }

    async execute(user_id) {
        const rentalByUser = await this.rentalRepository.findByUser(user_id);

        return rentalByUser;
    }
}

export { ListRentalsByUserUseCase };