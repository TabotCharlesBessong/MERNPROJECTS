import express, { Request, Response } from "express";
import AccountService from "../services/account.service";
import AccountDataSource from "../datasources/account.datasource";
import AccountController from "../controllers/account.controller";
import ValidationSchema from "../validators/account.validator.schema";
import { Auth, validator } from "../middlewares/index.middlewares";

const router = express.Router();
const accountService = new AccountService(new AccountDataSource());
const accountController = new AccountController(accountService);

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
  return router;
};

export default createAccountRoute();
