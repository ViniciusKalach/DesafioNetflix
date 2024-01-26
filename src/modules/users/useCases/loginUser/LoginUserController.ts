import { Request, Response } from "express";
import { LoginUserUseCase  } from "./LoginUserUseCase";

export class LoginUserController {
    async handle(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            const loginUserUseCase = new LoginUserUseCase();
    
            const result = await loginUserUseCase.execute({ email, password })
    
            return res.status(201).json(result);
        } catch (error) {
            console.error(error); // Adicione esta linha para registrar o erro no console
            throw error;
        }
    }
}