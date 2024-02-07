import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository';
import { userProvider } from './provider';

@Module({
  providers: [UserService, UserRepository, userProvider],
  exports: [UserService, UserRepository],
})
export class UserModule {}
