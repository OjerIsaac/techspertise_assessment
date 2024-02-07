import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorHelper, PasswordHelper } from '../../utils';
import { RegisterUserDto, LoginAuthDto } from './dto';
import { UserRepository } from '../user/repository';
import { User } from '../user/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

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

    return this.serializeUser(registeredUser);
  }

  private serializeUser(user: User) {
    return {
      email: user.email,
      id: user.id,
    };
  }

  private async signUserToken(user: User) {
    const userInfo = this.serializeUser(user);

    const token = this.jwtService.sign(userInfo);

    return {
      ...userInfo,
      accessToken: token,
    };
  }

  async login(data: LoginAuthDto) {
    const registeredUser = await this.userRepo.findByEmail(data.email);

    const isPasswordCorrect = registeredUser
      ? await PasswordHelper.comparePassword(data.password, registeredUser.password)
      : null;

    if (!registeredUser || !isPasswordCorrect) {
      ErrorHelper.BadRequestException('Email or password is incorrect');
    }

    return this.signUserToken(registeredUser);
  }
}
