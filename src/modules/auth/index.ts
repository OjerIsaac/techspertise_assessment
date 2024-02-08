import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    imports: [
        TypeOrmModule.forFeature([]),
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "3h" },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
