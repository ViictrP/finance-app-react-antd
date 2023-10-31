import { Input, List, Skeleton, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RecurringExpenseDTO, TransactionDTO } from '../dto';
import { translateCategory } from '../helper/category.helper.ts';

const { Title } = Typography;

interface TransactionsProps {
  transactions?: TransactionDTO[];
  recurringExpenses?: RecurringExpenseDTO[];
}

const Transactions = ({
  transactions,
  recurringExpenses,
}: TransactionsProps) => (
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
    <List
      loading={!transactions}
      itemLayout="horizontal"
      dataSource={
        transactions?.concat(recurringExpenses as TransactionDTO[]) ?? []
      }
      renderItem={(item) => (
        <List.Item style={{ textAlign: 'left' }}>
          <Skeleton avatar title={false} loading={!transactions} active>
            <List.Item.Meta
              title={item.description}
              description={translateCategory(item.category)}
            />
          </Skeleton>
        </List.Item>
      )}
    ></List>
  </Space>
);

export default Transactions;
