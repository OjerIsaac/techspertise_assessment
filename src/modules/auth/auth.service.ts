import { Injectable } from '@nestjs/common';
import { ErrorHelper, PasswordHelper } from '../../utils';
import { RegisterUserDto } from './dto';
import { UserRepository } from '../user/repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async registerUser(data: RegisterUserDto) {
    const emailExist = await this.userRepo.findByEmail(data.email);

    if (emailExist) {
      ErrorHelper.ConflictException('Email already exist');
    }

    const hashedPassword = await PasswordHelper.hashPassword(data.password);

    const registeredUser = await this.userRepo.save({
      email: data.email,
      password: hashedPassword,
    });

    return registeredUser;
  }
}
