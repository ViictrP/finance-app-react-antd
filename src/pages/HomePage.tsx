import './style.scss';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { Button, Space, Typography } from 'antd';
import currencyFormatter from '../helper/currency.formatter.ts';
import Icon from '@ant-design/icons';
import BalanceIcon from '../assets/balance.svg?react';
import { MonthClosureDTO } from '../dto';
import { useCallback, useEffect, useState } from 'react';
import { Transactions } from '../components';
import calculateAvailableBalanceHelper from '../helper/calculate-available-balance.helper.ts';
import { format } from 'date-fns';

const { Text, Paragraph, Title } = Typography;

const HomePage = () => {
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [increasePercentage, setIncreasePercentage] = useState<number>(0);
  const { profile: user } = useUserSelector();
  const salary = Number(user?.salary);
  const today = new Date();

  const calculateAvailableBalance = useCallback(
    () => calculateAvailableBalanceHelper(user),
    [user]
  );

  useEffect(() => {
    if (user) {
      const availableBalance = calculateAvailableBalance();
      setAvailableBalance(() => availableBalance);
      const lastMonthAvailableBalance =
        user.monthClosures[user.monthClosures.length - 1]?.available || 0;

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
          <Text
            style={{ fontSize: 36, fontWeight: 'bold' }}
            type={availableBalance > 0 ? 'success' : 'danger'}
          >
            {currencyFormatter(availableBalance)}
            <Paragraph
              strong
              type={increasePercentage > 0 ? 'success' : 'danger'}
            >
              {increasePercentage}%
            </Paragraph>
          </Text>
        </Paragraph>
        <Space align="center">
          <Text strong style={{ fontSize: 16 }}>
            {format(today, 'MMM').toUpperCase()}
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
          <Text strong>
            {monthClosure.month}
            <small style={{ paddingLeft: '0.8px' }}>
              <small>{monthClosure.year}</small>
            </small>
          </Text>{' '}
          <br />
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
    <>
      <Space
        size="small"
        direction="vertical"
        align="start"
        className="home-card credit-cards-card"
        style={{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          marginBottom: 0,
          paddingBottom: 0,
        }}
      >
        <Title level={2} style={{ textAlign: 'left' }}>
          Cartões
        </Title>
      </Space>
      <Space
        direction="vertical"
        align="start"
        className="home-card credit-cards-card"
        style={{ backgroundColor: 'transparent', overflow: 'auto' }}
      >
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
    </>
  );

  return (
    <>
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
