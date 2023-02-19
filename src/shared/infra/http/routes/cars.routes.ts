import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsControllers";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarsController = new CreateCarController();
const listAvaliableCars = new ListAvaliableCarsController();
const createCarsSpecificationController = new CreateCarSpecificationController();

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarsController.handle);
carsRouter.get("/avaliable", listAvaliableCars.handle);
carsRouter.post("/specification/:id", ensureAuthenticated, ensureAdmin, createCarsSpecificationController.handle);

export { carsRouter };