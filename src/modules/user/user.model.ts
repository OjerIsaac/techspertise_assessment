import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserInput {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
