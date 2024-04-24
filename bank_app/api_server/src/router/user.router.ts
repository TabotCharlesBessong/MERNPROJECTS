import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import TokenDataSource from "../datasources/token.datasource";
import UserDataSource from "../datasources/user.datasource";
import { validator } from "../middlewares/index.middlewares";
import TokenService from "../services/token.service";
import UserService from "../services/user.services";
import validationSchema from "../validators/user.validator.schema";
const createUserRoute = () => {
  const router = express.Router();
  const userService = new UserService(new UserDataSource());
  const tokenService = new TokenService(new TokenDataSource());
  const userController = new UserController(userService, tokenService);

  router.post(
    "/register",
    validator(validationSchema.registrationSchema),
    (req: Request, res: Response) => {
      return userController.register(req, res);
    }
  );

  router.post(
    "/login",
    validator(validationSchema.loginSchema),
    (req: Request, res: Response) => {
      return userController.login(req, res);
    }
  );

  router.post(
    "/forgot-password",
    validator(validationSchema.forgotPasswordSchema),
    (req: Request, res: Response) => {
      return userController.forgotPassword(req, res);
    }
  );

  router.post(
    "/reset-password",
    validator(validationSchema.resetPasswordSchema),
    (req: Request, res: Response) => {
      return userController.resetPassword(req, res);
    }
  );

  return router;
};

export default createUserRoute();
