import { Avatar, Button, Space } from 'antd';
import useAuth from '../context/hooks/use-auth.hook.ts';
import { useUserSelector } from '../stores/slices/user.slice.ts';
import { useCookies } from 'react-cookie';

const Header = () => {
  const { authUser, profile } = useUserSelector();
  const [cookie] = useCookies(['userPic']);
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
          src={authUser?.photoUrl ?? cookie.userPic}
          alt={authUser?.name ?? 'profile picture'}
        />
        <span style={{ fontWeight: 'bold' }}>
          {profile?.name ?? authUser?.name ?? 'carregando'}
        </span>
        {profile ? <span>R${(profile.salary / 1000).toFixed(2)}K</span> : <></>}
      </Space>
      <Button type="link" size="large" onClick={() => logout()}>
        sair
      </Button>
    </Space>
  );
};

export default Header;
