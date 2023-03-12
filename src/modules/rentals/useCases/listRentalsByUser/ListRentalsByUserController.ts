import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";


class ListRentalsByUserController {

    async handle(req: Request, res: Response) {
        const { id } = req.user;

        const listRentalsByUserCase = container.resolve(ListRentalsByUserUseCase);

        const rentals = await listRentalsByUserCase.execute(id);

        return res.json(rentals);
    }
}

export { ListRentalsByUserController };