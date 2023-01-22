import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: SpecificationsRepository) { }

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error(`Specification ${name} already exists!`);
        }

        this.specificationRepository.create({
            name,
            description
        });

    }
}

export { CreateSpecificationUseCase };