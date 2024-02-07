import { Column, Entity } from 'typeorm';
import { BaseTable } from '../../../database';

@Entity({ name: 'demo' })
export class Demo extends BaseTable {
  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;
}
