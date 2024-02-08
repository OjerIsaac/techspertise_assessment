import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AuthModule } from "./modules/auth";
import { UserModule } from "./modules/user";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AcceptLanguageResolver, HeaderResolver, I18nModule } from "nestjs-i18n";
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                type: "postgres",
                host: config.get("DB_HOST"),
                port: Number(config.get("DB_PORT")),
                username: config.get("DB_USERNAME"),
                password: config.get("DB_PASSWORD"),
                database: config.get("DB_NAME"),
                namingStrategy: new SnakeNamingStrategy(),
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        I18nModule.forRoot({
            fallbackLanguage: "en",
            loaderOptions: {
                path: path.join(__dirname, "/i18n/"),
                watch: true,
            },
            resolvers: [new HeaderResolver(["x-lang"]), AcceptLanguageResolver],
        }),
    ],
    providers: [JwtStrategy],
    exports: [JwtStrategy],
})
export class AppModule {}
