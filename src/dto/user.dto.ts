import CreditCardDTO from './credit-card.dto.ts';
import TransactionDTO from './transaction.dto.ts';
import RecurringExpenseDTO from './recurring-expense.dto.ts';
import MonthClosureDTO from './month-closure.dto.ts';

export default interface UserDTO {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  salary?: number;
  creditCards: CreditCardDTO[];
  transactions: TransactionDTO[];
  recurringExpenses: RecurringExpenseDTO[];
  monthClosures: MonthClosureDTO[];
  delete: boolean;
  deleteDate?: Date;
}
