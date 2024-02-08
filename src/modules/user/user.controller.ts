import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller({ path: "user", version: "1" })
export class UserController {
    constructor(private userService: UserService) {}
}
