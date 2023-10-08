import {
  Button,
  Form,
  Input,
  message,
  notification,
  Space,
  Typography,
} from 'antd';
import Icon, {
  GoogleOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Panda from '../assets/panda.svg?react';
import { LoginDTO } from '../dto';
import { useAuth } from '../context/hooks';
import { AuthUser, userActions } from '../stores/slices/user.slice.ts';
import { useAppDispatch } from '../app/hook.ts';

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<LoginDTO>();
  const fields = Form.useWatch([], form);
  const { authenticate } = useAuth();
  const dispatch = useAppDispatch();

  const enterLoading = (isLoading: boolean) => {
    setLoading(() => isLoading);
  };

  const openNotificationWithIcon = (message: string) => {
    notification.error({
      message: 'Erro ao autenticar',
      description: message,
    });
  };

  const loggedInHandler = (user: AuthUser) => {
    message.success('Bem-vindo(a)!');
    dispatch(
      userActions.setAuthUser({
        name: user?.name,
        email: user.email,
        photoUrl: user?.photoUrl,
      })
    );
  };

  const authenticateWithGoogle = () => {
    enterLoading(true);
    authenticate(
      loggedInHandler,
      (err) => openNotificationWithIcon(err.message),
      () => enterLoading(false)
    );
  };

  const onFinish = (values: LoginDTO) => {
    enterLoading(true);
    console.log(values);
    enterLoading(false);
  };

  return (
    <Space direction="vertical" size="large">
      <div>
        <Typography.Title level={2}>Finance App</Typography.Title>
        <Typography.Text>
          Ao continuar, você concorda com nosso Contrato de Usuário e nossa
          Política de Privacidade.
        </Typography.Text>
      </div>
      <Form
        form={form}
        name="login"
        autoComplete="true"
        layout="vertical"
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item<LoginDTO>
          name="email"
          hasFeedback
          rules={[{ required: true, message: 'O e-mail é obrigatório!' }]}
        >
          <Input
            name="email"
            size="large"
            placeholder="E-mail"
            allowClear={true}
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item<LoginDTO>
          name="password"
          hasFeedback
          rules={[{ required: true, message: 'A senha é obrigatória!' }]}
        >
          <Input
            name="password"
            type="password"
            size="large"
            placeholder="Senha"
            allowClear={true}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            size="large"
            type={!fields?.email || !fields?.password ? 'dashed' : 'primary'}
            htmlType="submit"
            icon={<LoginOutlined />}
            loading={loading}
            disabled={!fields?.email || !fields?.password}
          >
            Entrar
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>Ou</Typography.Text>
      <Button
        size="large"
        style={{ width: '100%' }}
        type="default"
        icon={<GoogleOutlined />}
        loading={loading}
        onClick={() => authenticateWithGoogle()}
      >
        Accesse com google!
      </Button>
      <Space align="baseline">
        <Icon component={() => <Panda />}></Icon>
        <Typography.Text type="secondary">
          Finance App 1.0.0 <br /> copyright 2023
        </Typography.Text>
      </Space>
    </Space>
  );
};

export default LoginPage;
