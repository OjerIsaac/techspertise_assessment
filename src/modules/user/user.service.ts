import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserInput } from "./user.model";
import { getHashedPassword } from "../../lib/auth";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(data: CreateUserInput): Promise<User> {
        const doesUserExist = await this.checkIfUserExist({
            email: data.email,
        });

        if (doesUserExist) {
            return null;
        }

        const hashedPassword = getHashedPassword(data.password);
        const user = await this.userRepository.save(
            this.userRepository.create({
                ...data,
                password: hashedPassword,
            }),
        );
        return user;
    }

    async checkIfUserExist({ email }: { email: string }) {
        if (!email) {
            return true;
        }
        const user = await this.userRepository.count({ where: [{ email }] });
        return user > 0;
    }

    async getUserByEmailWithPassword(email: string) {
        return await this.userRepository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .addSelect("user.password")
            .getOne();
    }
}
