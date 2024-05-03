import express, { Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import TransactionDataSource from "../datasources/transaction.datasource";
import TransactionController from "../controllers/transaction.controller";
import ValidationSchema from "../validators/transaction.validator.schema";
import { Auth, validator } from "../middlewares/index.middlewares";

const router = express.Router();
const transactionService = new TransactionService(new TransactionDataSource());
const transactionController = new TransactionController(transactionService);

const createTransactionRoute = () => {
  router.post(
    "/initiate-paystack-deposit",
    validator(ValidationSchema.initiatePaystackDeposit),
    Auth(),
    (req: Request, res: Response) => {
      return transactionController.initiatePaystackDeposit(req, res);
    }
  );
  return router;
};

export default createTransactionRoute;
