import { autoInjectable } from "tsyringe";
import LoanDataSource from "../datasources/loan.datasource";
import { IFindLoanQuery, ILoan, ILoanCreationBody } from "../interfaces/loan.interface";
import { LoanStatus } from "../interfaces/enum/loan.enum";

@autoInjectable()
class LoanService {
  private loanDataSource: LoanDataSource;

  constructor(_loanDataSource: LoanDataSource) {
    this.loanDataSource = _loanDataSource;
  }

  async getLoanByField(record: Partial<ILoan>): Promise<ILoan | null> {
    const query = { where: { ...record }, raw: true } as IFindLoanQuery;
    return this.loanDataSource.fetchOne(query);
  }

  async createLoan(data: Partial<ILoanCreationBody>): Promise<ILoan> {
    const record = { ...data, status: LoanStatus.PENDING } as ILoanCreationBody;
    return this.loanDataSource.create(record);
  }

  async getLoansByUserId(userId: keyof ILoan): Promise<ILoan[]> {
    const query = { where: { userId }, raw: true };
    return this.loanDataSource.fetchAll(query);
  }

  async getLoans(): Promise<ILoan[]> {
    const query = { where: {}, raw: true };
    return this.loanDataSource.fetchAll(query);
  }

  async updateRecord(
    searchBy: Partial<ILoan>,
    record: Partial<ILoan>
  ): Promise<void> {
    const query = { where: { ...searchBy } } as IFindLoanQuery;
    await this.loanDataSource.updateOne(record, query);
  }
}

export default LoanService