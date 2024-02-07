import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { envVarsSchema } from './helpers';
import { DatabaseModule } from './database';
import { JWT_SECRET } from './base/constants';
import { DemoModule } from './modules/demo/demo.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
