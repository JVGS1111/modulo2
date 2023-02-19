import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private repository: Specification[] = []

    constructor() { }


    async create({ description, name }: IcreateSpecificationDTO): Promise<Specification> {

        const specification = new Specification();
        Object.assign(specification, { description, name });
        this.repository.push(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const spec = this.repository.find((item) => item.name === name);
        return spec;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpec = this.repository.filter(spec => ids.includes(spec.id));
        return allSpec;
    }
}

export { SpecificationsRepositoryInMemory };