import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";

class TransactionController {
  private transactionService:TransactionService

  constructor(_transactionService:TransactionService){
    this.transactionService = _transactionService
  }

  async initiatePaystackDeposit(req:Request,res:Response){
    try {
      const params = {...req.body}
      // const depositInfo = await 
    } catch (error) {
      
    }
  }
}