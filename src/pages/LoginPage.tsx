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
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Panda from '../assets/panda.svg?react';
import { LoginDTO } from '../dto';
import { LoginError } from '../errors';
import { useAuth } from '../context/hooks';

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<LoginDTO>();
  const fields = Form.useWatch([], form);
  const { authenticate } = useAuth();

  const enterLoading = (isLoading: boolean) => {
    setLoading(() => isLoading);
  };

  const openNotificationWithIcon = (message: string) => {
    notification.error({
      message: 'Erro ao autenticar',
      description: message,
    });
  };

  const onFinish = (values: LoginDTO) => {
    enterLoading(true);
    authenticate(values)
      .then(() => message.success('Bem-vindo(a)!'))
      .catch((err) => openNotificationWithIcon((err as LoginError).message))
      .finally(() => enterLoading(false));
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
