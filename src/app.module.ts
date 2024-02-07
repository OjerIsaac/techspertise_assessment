import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { envVarsSchema } from './helpers';
import { DatabaseModule } from './database';
import { JWT_SECRET } from './base/constants';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envVarsSchema,
    }),
    DatabaseModule,
    {
      ...JwtModule.register({
        secret: JWT_SECRET,
        signOptions: {},
      }),
      global: true,
    },
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
