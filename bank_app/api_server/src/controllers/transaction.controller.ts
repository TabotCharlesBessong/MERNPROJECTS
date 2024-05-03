import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import PaymentService from "../services/payment.services";
import Utility from "../utils/index.utils";
import { ResponseCode } from "../interfaces/enum/code.enum";

class TransactionController {
  private transactionService: TransactionService;

  constructor(_transactionService: TransactionService) {
    this.transactionService = _transactionService;
  }

  async initiatePaystackDeposit(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const depositInfo = await PaymentService.generatePaystackPaymentUrl(
        params.user.email,
        params.amount
      );
      console.log("1XXXXXXXX2-------3XXXXXXX41");
      if (!depositInfo) {
        return Utility.handleError(
          res,
          "Paystack payment not available, try again in a few seconds please",
          ResponseCode.NOT_FOUND
        );
      }
      console.log("1XXXXXXXX2-------3XXXXXXX42");
      const newTransaction = {
        userId: params.user.id,
        accountId: params.accountId,
        amount: params.amount,
        reference: depositInfo.reference,
        detail: {},
      };

      let deposit = await this.transactionService.depositByPayStack(
        newTransaction
      );
      console.log("1XXXXXXXX2-------3XXXXXXX43");
      return Utility.handleSuccess(
        res,
        "Transaction created successfully",
        { transaction: deposit, url: depositInfo.authorization_url },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      console.log("5XXXXXXX6--------7XXXXXX8");
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }
}

export default TransactionController