import { Avatar, Button, Space } from 'antd';
import { useAuth } from '../context/hooks';
import { useUserSelector } from '../stores/slices/user.slice.ts';

const Header = () => {
  const { authUser } = useUserSelector();
  const { logout } = useAuth();

  return (
    <Space
      direction="horizontal"
      align="center"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <Space size="small">
        <Avatar
          src={authUser?.photoUrl}
          alt={authUser?.name ?? 'profile picture'}
        />
        <span style={{ fontWeight: 'bold' }}>{authUser?.name}</span>
      </Space>
      <Button type="link" size="large" onClick={() => logout()}>
        sair
      </Button>
    </Space>
  );
};

export default Header;
