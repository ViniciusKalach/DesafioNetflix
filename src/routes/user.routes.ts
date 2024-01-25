import { Router } from "express";
import { CreaterUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { LoginUserController } from "../modules/users/useCases/loginUser/LoginUserController";

const createrUserController = new CreaterUserController();
const loginUserController = new LoginUserController();

const userRoutes = Router();

userRoutes.post("/create", createrUserController.handle);
userRoutes.get("/login", loginUserController.handle)

export { userRoutes };