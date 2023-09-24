import { useUserSelector } from '../stores/slices/user.slice.ts';
import { Button, Space, Typography } from 'antd';
import { useAuth } from '../context/AuthContext.tsx';

const HomePage = () => {
  const { profile: user } = useUserSelector();
  const { logout } = useAuth();
  const currencyFormat = (num: number) => {
    return (
      'R$' + num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        .replace('.', ',')
        .replace(',', '.')
    );
  };

  return (
    <Space
      direction='horizontal'
      align='baseline'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Typography.Title level={4}>
        Olá {user?.name}!
        <Typography.Paragraph>
          salário&nbsp;
          <Typography.Text type='secondary'>
            {currencyFormat(Number(user?.salary ?? 0))}
          </Typography.Text>
        </Typography.Paragraph>
      </Typography.Title>
      <Button type='link' size='large' onClick={logout}>sair</Button>
    </Space>
  );
};

export default HomePage;
