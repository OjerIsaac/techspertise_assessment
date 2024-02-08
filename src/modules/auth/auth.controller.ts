import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserInput } from "../user/user.model";
import { LoginUserInput } from "./auth.model";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { DateTime } from "luxon";

@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post("/signup")
    async signup(@Body() payload: CreateUserInput, @Res() res: Response) {
        const isUserCreated = await this.userService.createUser(payload);
        if (!isUserCreated) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email already taken",
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        return res.status(HttpStatus.CREATED).json({
            message: "Signup successful",
            statusCode: HttpStatus.CREATED,
        });
    }

    @Post("/login")
    async login(@Body() payload: LoginUserInput, @Req() req: Request, @Res() res: Response) {
        const user = await this.userService.getUserByEmailWithPassword(payload.email);

        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: "Invalid login credentials",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }

        const token = await this.authService.getUserToken(user, payload.password);
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: "Invalid login credentials",
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }

        return res
            .status(HttpStatus.OK)
            .cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                expires: DateTime.now().plus({ hours: 3 }).toJSDate(),
                path: "/",
            })
            .json({
                message: "login successful",
                statusCode: HttpStatus.OK,
            });
    }
}
