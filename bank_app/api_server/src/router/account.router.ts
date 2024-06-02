import express, { Request, Response } from "express";
import AccountService from "../services/account.service";
import AccountDataSource from "../datasources/account.datasource";
import AccountController from "../controllers/account.controller";
import ValidationSchema from "../validators/account.validator.schema";
import { Auth, validator } from "../middlewares/index.middlewares";
import { container } from "tsyringe";

const router = express.Router();
const accountController = container.resolve(AccountController);

const createAccountRoute = () => {
  router.post(
    "/create",
    validator(ValidationSchema.createAccountSchema),
    Auth(),
    (req: Request, res: Response) => {
      return accountController.createAccount(req, res);
    }
  );

  router.get("/list/all", Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccounts(req, res);
  });

  router.get("/list/:id", Auth(), (req: Request, res: Response) => {
    return accountController.getUserAccount(req, res);
  });

  router.get("/payee/list", Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserPayee(req, res);
  });

  router.get("/payee/:id", Auth(), (req: Request, res: Response) => {
    return accountController.getUserPayee(req, res);
  });
  return router;
};

export default createAccountRoute();
