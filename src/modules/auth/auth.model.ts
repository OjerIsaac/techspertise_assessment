import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordInput {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;
}

export class LoginUserInput {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
