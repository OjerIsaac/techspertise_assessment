import { Controller, Post, Body } from '@nestjs/common';
import { HttpResponse } from '../../utils';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: RegisterUserDto) {
    const data = await this.authService.registerUser(createAuthDto);

    return HttpResponse.success({ data, message: 'User created successfully' });
  }
}
