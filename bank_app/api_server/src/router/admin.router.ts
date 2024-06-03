import express, { Request, Response } from "express";
import { container } from "tsyringe";
import UserController from "../controllers/user.controller";
import AccountController from "../controllers/account.controller";
import TransactionController from "../controllers/transaction.controller";
import { AdminAuth } from "../middlewares/index.middlewares";

const router = express.Router();
const userController = container.resolve(UserController);
const accountController = container.resolve(AccountController);
const transactionController = container.resolve(TransactionController);

const createAdminRoute = () => {
  router.get("/users", AdminAuth(), (req: Request, res: Response) => {
    return userController.getAllUsersByAdmin(req, res);
  });

  router.get("/user/:id", AdminAuth(), (req: Request, res: Response) => {
    return userController.getSignleUserById(req, res);
  });

  return router;
};

export default createAdminRoute();
