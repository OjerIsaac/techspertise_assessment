import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export interface ResponseType<P> {
    message: string;
    statusCode: HttpStatus;
    data: P;
}

export type GenericResponse<P> = Response<ResponseType<P>>;

export interface JWTPayload {
    email: string;
    sub: string;
}
