import express, { Request, Response } from "express";
import { container } from "tsyringe";
import UserController from "../controllers/user.controller";
import AccountController from "../controllers/account.controller";
import TransactionController from "../controllers/transaction.controller";
import { AdminAuth, validator } from "../middlewares/index.middlewares";
import validationSchema from "../validators/user.validator.schema";
import AccountValidationSchema from "../validators/account.validator.schema"

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

  router.post(
    "/user/set-user-status",
    validator(validationSchema.setAccountStatusSchema),
    AdminAuth(),
    (req: Request, res: Response) => {
      return userController.setAccountStatus(req, res);
    }
  );

  router.get("/accounts", AdminAuth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccountsAdmin(req, res);
  });

  router.get("/account/:id", AdminAuth(), (req: Request, res: Response) => {
    return accountController.getUserAccountAdmin(req, res);
  });

  router.get("/transactions", AdminAuth(), (req: Request, res: Response) => {
    return transactionController.getAllUserTransactionsAdmin(req, res);
  });

  router.get("/loans", AdminAuth(), (req: Request, res: Response) => {
    return accountController.getLoansAdmin(req, res);
  });

  router.post(
    "/loans/approve-decline-loan",
    validator(AccountValidationSchema.approveOrDeclineLoanSchema),
    AdminAuth(),
    (req: Request, res: Response) => {
      return accountController.approveOrDeclineLoanByAdmin(req, res);
    }
  );

  return router;
};

export default createAdminRoute();
