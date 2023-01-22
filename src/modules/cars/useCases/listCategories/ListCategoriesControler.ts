import { Request, Response } from "express";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    list(req: Request, res: Response): Response {
        const all = this.listCategoriesUseCase.execute()

        return res.status(200).json(all);
    }
}

export { ListCategoriesController };