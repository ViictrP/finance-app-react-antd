import './style.scss';
import Header from '../components/Header.tsx';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { Input, Space, Typography } from 'antd';
import { currencyFormatter } from '../helper';
import Icon, { SearchOutlined } from '@ant-design/icons';
import BalanceIcon from '../assets/balance.svg?react';
import { MonthClosureDTO } from '../dto';

const { Text, Paragraph, Title } = Typography;

const HomePage = () => {
  const { profile: user } = useUserSelector();
  const salary = Number(user?.salary);

  console.log('rendering');

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
            {currencyFormatter(salary - 15833)}
            <Paragraph strong type="warning">
              - 12.33%
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
  const Transactions = () => (
    <Space
      direction="vertical"
      align="start"
      className="home-card transactions-card"
      style={{ backgroundColor: 'transparent' }}
    >
      <Title level={2} style={{ textAlign: 'left' }}>
        Transactions
      </Title>
      <Input
        size="large"
        placeholder="filtrar transações..."
        prefix={<SearchOutlined />}
      />
    </Space>
  );

  return (
    <>
      <Header />
      <Balance />
      <Graph />
      <Transactions />
    </>
  );
};

export default HomePage;
