import { Router } from 'express';
import { authRoutes } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { specificationRoutes } from './specifications.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRouter);
router.use("/rentals", rentalRoutes);
router.use(authRoutes);

export { router };