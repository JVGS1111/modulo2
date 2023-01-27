import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

    async list(req: Request, res: Response) {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoriesUseCase.execute();

        return res.status(200).json(all);
    }
}

export { ListCategoriesController };