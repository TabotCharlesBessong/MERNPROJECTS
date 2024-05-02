import { TransactionGateWay, TransactionStatus, TransactionTypes } from "../interfaces/enum/transaction.enum"
import { ITokenCreationBody } from "../interfaces/token.interface"
import { ITransaction, ITransactionCreationBody, ITransactionDataSource } from "../interfaces/transaction.interface"

class TransactionService {
  private transactionDataSource:ITransactionDataSource

  constructor(_transactionDataSource:ITransactionDataSource){
    this.transactionDataSource = _transactionDataSource
  }

  async depositByPayStack(data:Partial<ITransaction>):Promise<ITransaction>{
    const deposit = {
      ...data,
      type:TransactionTypes.DEPOSIT,
      detail:{
        ...data.detail,
        gateway:TransactionGateWay.PAYSTACK
      },
      status:TransactionStatus.IN_PROGRESS
    } as ITransactionCreationBody
    return this.transactionDataSource.create(deposit)
  }
}

export default TransactionService