import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWTPayload } from "../lib/types";
import { Request } from "express";
import { User } from "../modules/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWTFromCookie]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies.token) {
            return req.cookies.token;
        }

        return null;
    }

    async validate(payload: JWTPayload) {
        interface IUser {
            id: string;
            email: string;
        }
        let user: IUser;

        if (!user || user.email !== payload.email) {
            throw new UnauthorizedException();
        }

        return user as User;
    }
}
