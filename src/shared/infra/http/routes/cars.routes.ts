import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsControllers";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarsController = new CreateCarController();
const listAvaliableCars = new ListAvaliableCarsController();

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarsController.handle);
carsRouter.get("/avaliable", listAvaliableCars.handle)

export { carsRouter };