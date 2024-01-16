import { Input, List, Skeleton, Space, Typography } from 'antd';
import Icon, { SearchOutlined } from '@ant-design/icons';
import { RecurringExpenseDTO, TransactionDTO } from '../dto';
import { translateCategory } from '../helper/category.helper.ts';
import CartIcon from '../assets/cart.svg?react';
import ShopIcon from '../assets/shop.svg?react';
import FoodIcon from '../assets/food.svg?react';
import HomeIcon from '../assets/home.svg?react';
import { ReactElement } from 'react';
import currencyFormatter from '../helper/currency.formatter.ts';

const { Title, Text } = Typography;

interface TransactionsProps {
  transactions?: TransactionDTO[];
  recurringExpenses?: RecurringExpenseDTO[];
}

const Transactions = ({
  transactions,
  recurringExpenses,
}: TransactionsProps) => {
  const categoriesIcons = new Map<string, ReactElement>()
    .set('home', <HomeIcon />)
    .set('other', <CartIcon />)
    .set('food', <FoodIcon />)
    .set('credit-card', <CartIcon />)
    .set('shop', <ShopIcon />);

  return (
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
        style={{ marginTop: '36px' }}
        loading={!transactions}
        itemLayout="horizontal"
        dataSource={
          transactions?.concat(recurringExpenses as TransactionDTO[]) ?? []
        }
        renderItem={(item) => (
          <List.Item style={{ textAlign: 'left' }}>
            <Skeleton avatar title={false} loading={!transactions} active>
              <List.Item.Meta
                avatar={
                  <Icon
                    component={() => categoriesIcons.get(item.category)}
                    style={{ fontSize: 32 }}
                  />
                }
                title={
                  <Text style={{ color: '#7c7b7b' }}>
                    {translateCategory(item.category)}
                  </Text>
                }
                description={<Text strong>{item.description}</Text>}
              />
              <Text strong style={{ fontSize: '1.2em' }}>
                {currencyFormatter(Number(item.amount))}
              </Text>
            </Skeleton>
          </List.Item>
        )}
      ></List>
    </Space>
  );
};

export default Transactions;
