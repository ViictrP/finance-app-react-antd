import './style.scss';
import Header from '../components/Header.tsx';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { Button, Space, Typography } from 'antd';
import { currencyFormatter } from '../helper';
import Icon from '@ant-design/icons';
import BalanceIcon from '../assets/balance.svg?react';
import { MonthClosureDTO, RecurringExpenseDTO, TransactionDTO } from '../dto';
import { useCallback, useEffect, useState } from 'react';
import { Transactions } from '../components';

const { Text, Paragraph, Title } = Typography;

const HomePage = () => {
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [increasePercentage, setIncreasePercentage] = useState<number>(0);
  const { profile: user } = useUserSelector();
  const salary = Number(user?.salary);

  const calculateAvailableBalance = useCallback(() => {
    const { creditCards, recurringExpenses, transactions } = user!;
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
  }, [salary, user]);

  const reduceIntoTotal = (
    acc: number,
    curr: TransactionDTO | RecurringExpenseDTO
  ) => acc + Number(curr.amount);

  useEffect(() => {
    if (user) {
      const availableBalance = calculateAvailableBalance();
      setAvailableBalance(() => availableBalance);
      const lastMonthAvailableBalance =
        user.monthClosures[user.monthClosures.length - 1].available;

      const lastMonthAvailableBalanceDifference =
        availableBalance - lastMonthAvailableBalance;
      const percentage = (
        (lastMonthAvailableBalanceDifference / availableBalance) *
        100
      ).toFixed(2);
      setIncreasePercentage(() => Number(percentage));
    }
  }, [calculateAvailableBalance, user]);

  const Balance = () => (
    <Space
      direction="vertical"
      className="home-card balance-card"
      align="start"
    >
      <Space
        align="start"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Paragraph type="secondary" style={{ textAlign: 'left', fontSize: 20 }}>
          Saldo do mês
          <br />
          <Text style={{ fontSize: 36, fontWeight: 'bold' }}>
            {currencyFormatter(availableBalance)}
            <Paragraph strong type="warning">
              {increasePercentage > 0 ? '+' : '-'} {increasePercentage}%
            </Paragraph>
          </Text>
        </Paragraph>
        <Space align="center">
          <Text strong style={{ fontSize: 16 }}>
            SET
          </Text>
          <Icon
            onClick={() => console.log('set')}
            component={() => <BalanceIcon />}
            style={{ fontSize: 32, color: '#1677ff' }}
          />
        </Space>
      </Space>
    </Space>
  );
  const GraphItem = ({ monthClosure }: { monthClosure: MonthClosureDTO }) => (
    <>
      <Space className="graph-item" direction="vertical" align="center">
        <div
          className="graph"
          style={{
            height:
              ((Number(monthClosure.expenses) / salary) * 100).toFixed(2) +
              'px',
          }}
        />
        <div>
          <Text strong>{monthClosure.month}</Text> <br />
          <Text strong>
            {(Number(monthClosure.expenses) / 1000).toFixed(2)}k
          </Text>
        </div>
      </Space>
    </>
  );
  const Graph = () => (
    <Space
      direction="horizontal"
      className="home-card graphs-card"
      align="center"
    >
      {user?.monthClosures.map((monthClosure) => (
        <GraphItem key={monthClosure.month} monthClosure={monthClosure} />
      ))}
    </Space>
  );
  const CardsChips = () => (
    <Space
      direction="vertical"
      align="start"
      className="home-card credit-cards-card"
      style={{ backgroundColor: 'transparent', overflow: 'auto' }}
    >
      <Title level={2} style={{ textAlign: 'left' }}>
        Cartões
      </Title>
      <Space direction="horizontal" size="small">
        {user?.creditCards.map((card) => (
          <Button
            type="text"
            key={card.id}
            style={{
              fontSize: '1.3rem',
              padding: '0 0.5rem',
              backgroundColor: 'rgb(204 204 204 / 30%)',
            }}
          >
            {card.title}
          </Button>
        ))}
      </Space>
    </Space>
  );

  return (
    <>
      <Header />
      <Balance />
      <Graph />
      <CardsChips />
      <Transactions
        transactions={user?.transactions}
        recurringExpenses={user?.recurringExpenses}
      />
    </>
  );
};

export default HomePage;
