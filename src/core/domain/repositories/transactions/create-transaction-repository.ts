import { TransactionEntity } from "../../entities/transaction-entity";

export abstract class CreateTransactionRepository {
  abstract create: (
    organizationId: string,
    ledgerId: string,
    transaction: TransactionEntity
  ) => Promise<TransactionEntity>
}