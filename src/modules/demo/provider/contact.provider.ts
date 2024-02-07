import { DataSource } from 'typeorm';
import { DATA_SOURCE } from 'src/database';
import { DEMO_REPOSITORY } from '../demo.constant';
import { Demo } from '../entities';

export const demoProvider = {
  provide: DEMO_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Demo),
  inject: [DATA_SOURCE],
};
