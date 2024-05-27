import express, { Request, Response } from "express";
import TransactionController from "../controllers/transaction.controller";
import AccountDataSource from "../datasources/account.datasource";
import TransactionDataSource from "../datasources/transaction.datasource";
import { Auth, validator } from "../middlewares/index.middlewares";
import AccountService from "../services/account.service";
import TransactionService from "../services/transaction.service";
import ValidationSchema from "../validators/transaction.validator.schema";

const router = express.Router();
const accountService = new AccountService(new AccountDataSource());
const transactionService = new TransactionService(new TransactionDataSource());
const transactionController = new TransactionController(
  transactionService,
  accountService
);

const createTransactionRoute = () => {
  router.post(
    "/initiate-paystack-deposit",
    validator(ValidationSchema.initiatePaystackDeposit),
    Auth(),
    (req: Request, res: Response) => {
      return transactionController.initiatePaystackDeposit(req, res);
    }
  );

  router.post(
    "/verify-paystack-deposit",
    validator(ValidationSchema.verifyPaystackDeposit),
    Auth(),
    (req: Request, res: Response) => {
      return transactionController.verifyPaystackDeposit(req, res);
    }
  );
  return router;
};

export default createTransactionRoute();
