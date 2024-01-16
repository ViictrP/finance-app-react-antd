import { RecurringExpenseDTO, TransactionDTO, UserDTO } from '../dto';

const reduceIntoTotal = (
  acc: number,
  curr: TransactionDTO | RecurringExpenseDTO
) => acc + Number(curr.amount);

const calculateAvailableBalanceHelper = (user?: UserDTO) => {
  if (user) {
    const salary = Number(user?.salary);
    const { creditCards, recurringExpenses, transactions } = user;
    const transactionsTotal = transactions.reduce(reduceIntoTotal, 0);
    const recurringExpensesTotal = recurringExpenses.reduce(reduceIntoTotal, 0);
    const creditCardsTotal = creditCards.reduce((sum, current) => {
      const invoice = current.invoices[0];
      const amount = invoice
        ? invoice.transactions.reduce((sum, current) => {
            return sum + Number(current.amount);
          }, 0)
        : 0;
      return sum + Number(amount);
    }, 0);
    return (
      salary - creditCardsTotal - recurringExpensesTotal - transactionsTotal
    );
  } else {
    return 0;
  }
};

export default calculateAvailableBalanceHelper;
