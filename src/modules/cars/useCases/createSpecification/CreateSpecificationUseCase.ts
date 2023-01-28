import { inject, injectable } from "tsyringe";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

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
            throw new Error(`Specification ${name} already exists!`);
        }

        await this.specificationRepository.create({
            name,
            description
        });

    }
}

export { CreateSpecificationUseCase };