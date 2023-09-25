import { useAuth } from '../context/AuthContext.tsx';
import { Button, Space } from 'antd';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
  const { profile: user } = useUserSelector();
  const { logout } = useAuth();

  return (
    <Space
      direction='horizontal'
      align='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <Button
        size='large'
        type='text'
        icon={<MenuOutlined />}>
        <span style={{fontWeight: 'bold'}}>{user?.name}</span>
      </Button>
      <Button
        type='link'
        size='large'
        onClick={logout}>
        sair
      </Button>
    </Space>
  );
}

export default Header;
