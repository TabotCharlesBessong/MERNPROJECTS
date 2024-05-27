import { autoInjectable } from "tsyringe"
import { TransactionGateWay, TransactionStatus, TransactionTypes } from "../interfaces/enum/transaction.enum"
import { ITokenCreationBody } from "../interfaces/token.interface"
import { IFindTransactionQuery, ITransaction, ITransactionCreationBody, ITransactionDataSource } from "../interfaces/transaction.interface"
import TransactionDataSource from "../datasources/transaction.datasource"
import { raw } from "express"
import { where } from "sequelize"

// @autoInjectable()
class TransactionService {
  private transactionDataSource:TransactionDataSource

  constructor(_transactionDataSource:TransactionDataSource){
    this.transactionDataSource = _transactionDataSource
  }

  async fetchTransactionByReference(reference:string):Promise<ITransaction | null>{
    const query = {
      where:{reference},
      raw:true
    }
    return this.transactionDataSource.fetchOne(query)
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

  async setStatus(transactionId:string,status:string,options:Partial<IFindTransactionQuery> = {}):Promise<void>{
    const filter = {where:{id:transactionId},...options}
    const update = {
      status
    }
    await this.transactionDataSource.updateOne(update,filter)
  }
}

export default TransactionService