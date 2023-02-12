import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRouter = Router();

const createCarsController = new CreateCarController();

carsRouter.post("/", createCarsController.handle);

export { carsRouter };