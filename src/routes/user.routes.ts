import { Router } from "express";
import { CreaterUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createrUserController = new CreaterUserController();

const userRoutes = Router();

userRoutes.post("/", createrUserController.handle);

export { userRoutes };