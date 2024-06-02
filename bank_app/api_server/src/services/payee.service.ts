import { autoInjectable } from "tsyringe";
import {
  IPayee,
  IPayeeCreationBody,
  IPayeeDataSource,
} from "../interfaces/payee.interface";
import PayeeDataSource from "../datasources/payee.datasource";

@autoInjectable()
class PayeeService {
  private payeeDataSource: PayeeDataSource;

  constructor(_payeeDataSource: PayeeDataSource) {
    this.payeeDataSource = _payeeDataSource;
  }

  async fetchPayeeAccountNumberAndBank(
    accountNumber: string,
    bankCode: string
  ): Promise<IPayee | null> {
    const query = { where: { accountNumber, bankCode }, raw: true };
    return await this.payeeDataSource.fetchOne(query);
  }

  async savePayeeRecord(data: Partial<IPayee>): Promise<IPayee> {
    const record = {
      ...data,
      detail: {
        ...data.detail,
      },
    } as IPayeeCreationBody;
    return await this.payeeDataSource.create(record);
  }
}

export default PayeeService;
