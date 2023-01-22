import { Category } from "../../model/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: ICategoryRepository) { }

    execute(): Category[] {

        const categories = this.categoriesRepository.list();
        console.log(categories);

        return categories;
    }
}

export { ListCategoriesUseCase };