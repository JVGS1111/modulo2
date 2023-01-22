import { Specification } from "../../model/Specification";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[]

    private static INSTANCES: SpecificationsRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstances(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCES) {
            this.INSTANCES = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCES;
    }

    create({ description, name }: IcreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;
    }
}

export { SpecificationsRepository };