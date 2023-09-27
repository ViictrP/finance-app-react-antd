import {Button, Space} from 'antd';
import {userActions, useUserSelector} from '../stores/slices/user.slice.ts';
import {MenuOutlined} from '@ant-design/icons';
import {useAuth} from "../context/hooks";
import {useAppDispatch} from "../app/hook.ts";

const Header = () => {
  const {profile: user} = useUserSelector();
  const dispatch = useAppDispatch();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    dispatch(userActions.clearProfile());
  };

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
        icon={<MenuOutlined/>}>
        <span style={{fontWeight: 'bold'}}>{user?.name}</span>
      </Button>
      <Button
        type='link'
        size='large'
        onClick={() => handleLogout()}>
        sair
      </Button>
    </Space>
  );
}

export default Header;
