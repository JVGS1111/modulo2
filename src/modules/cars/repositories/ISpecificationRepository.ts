import { Specification } from "../infra/typeorm/entities/Specification";

interface IcreateSpecificationDTO {
    name: string,
    description: string,

}

interface ISpecificationsRepository {
    create({ description, name }: IcreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>,
    findByIds(id: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, IcreateSpecificationDTO }