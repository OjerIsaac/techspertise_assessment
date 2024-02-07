import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { envVarsSchema } from './helpers';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database';
import { UserModule } from './modules/user/user.module';
import { JWT_SECRET } from './base/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envVarsSchema,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
    {
      ...JwtModule.register({
        secret: JWT_SECRET,
        signOptions: {},
      }),
      global: true,
    },
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
