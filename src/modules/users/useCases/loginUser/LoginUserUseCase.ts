import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { LoginUserDTO } from "../../dtos/LoginUserDTOS"; // Certifique-se de criar o DTO adequado
import { AppError } from "../../../../erros/AppError";

export class LoginUserUseCase {
    async execute({ email, password }: LoginUserDTO): Promise<User> {
        // Verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("User not found");
        }

        // Verificar se a senha está correta
        if (user.password !== password) {
            throw new AppError("Incorrect password");
        }
        return user;
    }
}