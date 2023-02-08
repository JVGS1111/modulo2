import { container } from 'tsyringe';

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/ropositories/SpecificationRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/ropositories/CategoriesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';


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

