import CreditCardDTO from './credit-card.dto.ts';
import TransactionDTO from './transaction.dto.ts';

export default interface InvoiceDTO {
  id: string;
  month: string;
  year: number;
  isClosed: boolean;
  creditCard: CreditCardDTO;
  transactions: TransactionDTO[];
  createdAt: Date;
}
