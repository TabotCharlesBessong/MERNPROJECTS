import {
  IAccountCreationBody,
  IAccountDataSource,
} from "../interfaces/account.interface";
import { AccountStatus } from "../interfaces/enum/user.enum";

class AccountService {
  private accountDataSource: IAccountDataSource;
  constructor(_accountDataSource: IAccountDataSource) {
    this.accountDataSource = _accountDataSource;
  }

  private generateAccountNumber(): string {
    let accountNumber = "";
    for (let i = 0; i < 10; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }

    console.log(accountNumber)
    return accountNumber;
  }

  private async createAccountNumber() {
    let accountNo = "";
    while (accountNo == "") {
      const result = this.generateAccountNumber();
      const exist = await this.accountDataSource.fetchOne({
        where: { accountNumber: result },
        raw: true,
      });
      if (!exist) {
        accountNo = result;
        break;
      }
    }
    console.log(accountNo)
    return accountNo;
  }

  async createAccount(data: Partial<IAccountCreationBody>) {
    const record = {
      ...data,
      accountNumber: await this.createAccountNumber(),
      balance: 0.0,
      status: AccountStatus.ACTIVE,
    } as IAccountCreationBody;
    console.log(this.accountDataSource.create(record))
    return this.accountDataSource.create(record);
  }

  async getAccountsByUserId(userId:string){
    const query = {
      where:{userId},
      raw:true
    }

    return this.accountDataSource.fetchAll(query)
  }
}

export default AccountService;
