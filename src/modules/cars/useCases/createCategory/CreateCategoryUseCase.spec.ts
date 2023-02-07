import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memeory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test",
        }
        await createCategoryUseCase.execute(category)
        const categoryCreated = await categoriesRepositoryInMemory.findByName("Category Test");

        expect(categoryCreated.name).toBe(category.name);
    });

    it("should not be able to create a new category if name already existis", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category Description Test",
            }
            await createCategoryUseCase.execute(category);
            await createCategoryUseCase.execute(category);

        }).rejects.toBeInstanceOf(AppError);
    })
})