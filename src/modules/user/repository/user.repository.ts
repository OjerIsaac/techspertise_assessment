import { Injectable, Inject } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BaseRepository } from '../../../database';
import { USER_REPOSITORY } from '../user.constant';
import { User } from '../entities';
import { isEmail } from '../../../utils';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: Repository<User>
  ) {
    super(userRepo);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        email: ILike(email),
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findByIdOrEmail(userIdentifier: string) {
    const isemail = isEmail(userIdentifier);

    return this.userRepo.findOne({
      where: {
        [isemail ? 'email' : 'id']: userIdentifier,
      },
    });
  }
}
