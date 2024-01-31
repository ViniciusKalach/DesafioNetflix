import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { LoginUserDTO } from "../../dtos/LoginUserDTOS"; // Certifique-se de criar o DTO adequado
import { AppError } from "../../../../erros/AppError";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class LoginUserUseCase {
    async execute({ email, password }: LoginUserDTO): Promise<{user: User, token: string}> {
        // Verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        const secretKey = process.env.JWT_SECRET;

        if (!user) {
            throw new AppError("User not found");
        }

        // Verificar se a senha está correta
        const passwordsMatch = bcrypt.compareSync(password, user.password);

        if (!passwordsMatch) {
            throw new AppError("Incorrect password");
        }

        if (!secretKey) {
            throw new AppError("JWT secret key is missing");
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        return { user, token };
    }
}