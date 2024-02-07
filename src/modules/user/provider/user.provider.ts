import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/database';
import { USER_REPOSITORY } from '../user.constant';
import { User } from '../entities';

export const userProvider = {
  provide: USER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: [DATA_SOURCE],
};
