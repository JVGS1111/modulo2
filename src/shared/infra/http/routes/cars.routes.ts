import { Router } from "express";
import multer from "multer";
import uploadConfig from '@config/upload'

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsControllers";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const carsRouter = Router();
const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarsController = new CreateCarController();
const listAvaliableCars = new ListAvaliableCarsController();
const createCarsSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarsController.handle);
carsRouter.get("/avaliable", listAvaliableCars.handle);
carsRouter.post("/specification/:id", ensureAuthenticated, ensureAdmin, createCarsSpecificationController.handle);
carsRouter.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle);

export { carsRouter };