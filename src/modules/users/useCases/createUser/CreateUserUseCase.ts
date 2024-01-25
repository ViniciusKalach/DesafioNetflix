import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client"  
import { CreateUserDTO } from "../../dtos/CreateUserDTOS"
import { AppError } from "../../../../erros/AppError";
import bcrypt from "bcrypt";
export class CreateUserUseCase {
    async execute({name, email, password}: CreateUserDTO): Promise<User> {
        // Verificar se o usuário já existe
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists!!");
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Criar o usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return user;
    }
}