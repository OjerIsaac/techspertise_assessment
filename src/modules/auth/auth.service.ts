import { Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";
import { comparePassword } from "../../lib/auth";
import { JWTPayload } from "../../lib/types";
import { JwtService } from "@nestjs/jwt";
import { JwtSignOptions } from "@nestjs/jwt/dist/interfaces";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async getUserToken(user: User, password: string) {
        if (!comparePassword(password, user.password)) {
            return null;
        }

        return this.getToken(user);
    }

    async getToken(user: User, options?: JwtSignOptions) {
        const payload: JWTPayload = {
            email: user.email,
            sub: user.id,
        };

        return this.jwtService.sign(payload, options);
    }
}
