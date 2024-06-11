import { Request, Response } from "express";
import AccountService from "../services/account.service";
import Utility from "../utils/index.utils";
import { ResponseCode } from "../interfaces/enum/code.enum";
import { autoInjectable } from "tsyringe";
import PayeeService from "../services/payee.service";
import LoanService from "../services/loan.services";
import TransactionService from "../services/transaction.service";
import Permissions from "../permission";

@autoInjectable()
class AccountController {
  private accountService: AccountService;
  private payeeService: PayeeService;
  private loanService: LoanService;
  private transactionService: TransactionService;

  constructor(
    _accountService: AccountService,
    _payeeService: PayeeService,
    _loanService: LoanService,
    _transactionService: TransactionService
  ) {
    this.accountService = _accountService;
    this.payeeService = _payeeService;
    this.loanService = _loanService;
    this.transactionService = _transactionService;
  }

  async createAccount(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newAccount = {
        userId: params.user.id,
        type: params.type,
      };

      let account = await this.accountService.createAccount(newAccount);
      return Utility.handleSuccess(
        res,
        "Account created successfully",
        { account },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getAllUserAccounts(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let accounts = await this.accountService.getAccountsByUserId(
        params.user.id
      );
      return Utility.handleSuccess(
        res,
        "Account fetched successfully",
        { accounts },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getUserAccount(req: Request, res: Response) {
    try {
      const params = { ...req.params };
      let account = await this.accountService.getAccountByField({
        id: params.id,
      });
      if (!account) {
        return Utility.handleError(
          res,
          "Account does not exist",
          ResponseCode.BAD_REQUEST
        );
      }
      return Utility.handleSuccess(
        res,
        "Account fetched successfully",
        { account },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getAllUserPayee(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let payees = await this.payeeService.getPayeesByUserId(params.user.id);
      return Utility.handleSuccess(
        res,
        "Payees fetched successfully",
        { payees },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getUserPayee(req: Request, res: Response) {
    try {
      const params = { ...req.params };
      let payee = await this.payeeService.getPayeeByField({
        id: Utility.escapeHtml(params.id),
      });
      if (!payee) {
        return Utility.handleError(
          res,
          "Payee does not exist",
          ResponseCode.NOT_FOUND
        );
      }
      return Utility.handleSuccess(
        res,
        "Payee fetched successfully",
        { payee },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getAllUserAccountsAdmin(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const admin = { ...req.body.user };
      const permission = Permissions.can(admin.role).readAny("accounts");
      if (!permission.granted)
        return Utility.handleError(
          res,
          "You are not authorized",
          ResponseCode.NOT_FOUND
        );
      let accounts = await this.accountService.getAccounts();
      return Utility.handleSuccess(
        res,
        "Accounts fetched successfully",
        { accounts },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async getUserAccountAdmin(req: Request, res: Response) {
    try {
      const params = { ...req.params };
      const admin = { ...req.body.user };
      const permission = Permissions.can(admin.role).readAny("accounts");
      if (!permission)
        return Utility.handleError(
          res,
          "Invalid Permission",
          ResponseCode.NOT_FOUND
        );
      let account = await this.accountService.getAccountByField({
        id: Utility.escapeHtml(params.id),
      });
      if (!account)
        return Utility.handleError(
          res,
          "Account does not exist",
          ResponseCode.NOT_FOUND
        );
      return Utility.handleSuccess(
        res,
        "Account fetched successfully",
        { account },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }
}

export default AccountController;
