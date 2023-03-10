import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) { }

    async execute({ name, description }: IRequest) {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError(`Specification ${name} already exists!`);
        }

        await this.specificationRepository.create({
            name,
            description
        });

    }
}

export { CreateSpecificationUseCase };