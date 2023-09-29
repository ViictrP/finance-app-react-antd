import './style.scss';
import Header from '../components/Header.tsx';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { Input, Space, Typography } from 'antd';
import { currencyFormatter } from '../helper';
import Icon, { SearchOutlined } from '@ant-design/icons';
import BalanceIcon from '../assets/balance.svg?react';

const { Text, Paragraph, Title } = Typography;

interface Graph {
  month: string;
  value: number;
}

const HomePage = () => {
  const { profile: user } = useUserSelector();
  const salary = Number(user?.salary);
  const graps: Graph[] = [
    { month: 'mai', value: 8333 },
    { month: 'jun', value: 13766 },
    { month: 'jul', value: 7787 },
    { month: 'ago', value: 13687 },
    { month: 'set', value: 6987 },
  ];

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
  const GraphItem = ({ graph }: { graph: Graph }) => (
    <>
      <Space className="graph-item" direction="vertical" align="center">
        <div
          className="graph"
          style={{
            height: ((graph.value / salary) * 100).toFixed(2) + 'px',
          }}
        />
        <div>
          <Text strong>{graph.month}</Text> <br />
          <Text strong>{(graph.value / 1000).toFixed(2)}k</Text>
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
      {graps.map((graph) => (
        <GraphItem key={graph.month} graph={graph} />
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
