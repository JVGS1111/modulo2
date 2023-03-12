import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
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

        const category = {
            name: "Category Test",
            description: "Category Description Test",
        }
        await createCategoryUseCase.execute(category);
        await expect(
            createCategoryUseCase.execute(category)
        ).rejects.toEqual(new AppError("Category already exists!"))
    })
})