import { Avatar, Button, Space } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { logout, user } = useAuth0();

  const logoutHandler = () => {
    logout({ logoutParams: { returnTo: window.location.origin } }).then(() =>
      console.log('logged out')
    );
  };

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
        <Avatar src={user?.picture} alt={user?.name} />
        <span style={{ fontWeight: 'bold' }}>{user?.name}</span>
      </Space>
      <Button type="link" size="large" onClick={() => logoutHandler()}>
        sair
      </Button>
    </Space>
  );
};

export default Header;
