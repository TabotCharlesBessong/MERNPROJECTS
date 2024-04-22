import express, { Request, Response } from "express";
import UserService from "../services/user.services";
import UserController from "../controllers/user.controller";
import Utility from "../utils/index.utils";
import UserDataSource from "../datasources/user.datasource";
import { validator } from "../middlewares/index.middlewares";
import validationSchema from "../validators/user.validator.schema";
const createUserRoute = () => {
  const router = express.Router();
  const userService = new UserService(new UserDataSource());
  const userController = new UserController(userService);

  router.post("/register",validator(validationSchema.registrationSchema) ,(req: Request, res: Response) => {
    return userController.register(req, res);
  });

  router.post("/login", (req: Request, res: Response) => {
    return userController.login(req, res);
  });

  router.post("/forgot-password", (req: Request, res: Response) => {
    return userController.forgotPassword(req, res);
  });

  router.post("/reset-password", (req: Request, res: Response) => {
    return userController.resetPassword(req, res);
  });
  
  return router;
};

export default createUserRoute();
