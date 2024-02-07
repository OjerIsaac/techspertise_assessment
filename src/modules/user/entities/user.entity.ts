import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseTable } from '../../../database';

@Entity({ name: 'user' })
export class User extends BaseTable {
  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  password: string;
}
