import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Button, Row, Form, Input, Col, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../contexts/AuthContext';

import { login } from '../../services/gastory.service';
import { setUserInformation } from '../../helpers/identity_helper';

const Login = () => {

  const [isError, setIsError] = useState(false);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogin = async (formData) => {
    const { password, username } = formData;
    setIsError(false);
    const response = await login(username, password);
    if (response?.status === 200) {
      window.location.reload();
      return setUserInformation(response?.data);
    }
    setIsError(response ? response.status : true);
  }
  if (authContext.auth && authContext.auth.isLoggedIn) {
    // Redirect if the user is already logged in
    return <Redirect to="/" />;
  }

  return (
    <Row align="middle" justify="center" className={css`margin: 200px 10px;`}>
      <Col xs={24} md={16} lg={10} >
        <Card title="Login">
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: t('login.usernameRequired') }]}
            >
              <Input prefix={<UserOutlined />} placeholder={t('login.username')} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: t('login.passwordRequired') }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={t('login.password')} />
            </Form.Item>
            <Form.Item>
              <Link to="/whoopsis" >{t('login.forgotPassword')}</Link>
            </Form.Item>
            {isError && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message="Login failed"
                description={`${isError === 401 ? t('login.loginFailed401') : t('login.loginFailed')}`}
                type="error" />
            </div>}
            <Form.Item >
              <Button type="primary" htmlType="submit">
                {t('login.login')}
                </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/signup" >{t('login.signup')}</Link>
            </Form.Item>
          </Form >
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(Login);