import { container } from 'tsyringe';

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';


container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)
