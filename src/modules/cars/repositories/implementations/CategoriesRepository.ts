import { Category } from "../../model/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";


class CategoriesRepository implements ICategoryRepository {

    private categories: Category[];
    private static INSTANCES: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCES) {
            CategoriesRepository.INSTANCES = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCES;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        return this.categories.find(category => category.name === name);
    }
}

export { CategoriesRepository }