import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";


class ListAvaliableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { brand, name, category_id } = req.query;

        const listAvaliableCarsUseCase = container.resolve(ListAvaliableCarsUseCase);
        const cars = await listAvaliableCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string
        });
        return res.json(cars);
    }
}

export { ListAvaliableCarsController }