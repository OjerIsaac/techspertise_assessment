import { HttpException, Module } from "@nestjs/common";
import { SentryInterceptor, SentryModule } from "@ntegral/nestjs-sentry";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { APP_INTERCEPTOR } from "@nestjs/core";
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
        SentryModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                dsn: config.get("SENTRY_DSN"),
                debug: true,
                enabled: config.get("NODE_ENV") !== "test",
                environment: config.get("NODE_ENV"),
                release: config.get("APP_RELEASE"),
                logLevels: ["log", "error", "warn", "debug", "verbose"],
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                type: "postgres",
                host:
                    config.get("NODE_ENV") === "test" ? config.get("TEST_DATABASE_HOST") : config.get("DATABASE_HOST"),
                port:
                    config.get("NODE_ENV") === "test"
                        ? config.get("TEST_DATABASE_PORT")
                        : Number(config.get("DATABASE_PORT")),
                username:
                    config.get("NODE_ENV") === "test"
                        ? config.get("TEST_DATABASE_USERNAME")
                        : config.get("DATABASE_USERNAME"),
                password:
                    config.get("NODE_ENV") === "test"
                        ? config.get("TEST_DATABASE_PASSWORD")
                        : config.get("DATABASE_PASSWORD"),
                database:
                    config.get("NODE_ENV") === "test" ? config.get("TEST_DATABASE_NAME") : config.get("DATABASE_NAME"),
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
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useFactory: () =>
                new SentryInterceptor({
                    filters: [
                        {
                            type: HttpException,
                            filter: (exception: HttpException) => 500 >= exception.getStatus(),
                        },
                    ],
                }),
        },
        JwtStrategy,
    ],
    exports: [JwtStrategy],
})
export class AppModule {}
