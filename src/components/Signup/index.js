import React, { useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';

import { signup } from '../../services/gastory.service';
import { setUserInformation } from '../../helpers/identity_helper';

import AuthContext from '../../contexts/AuthContext';

const Signup = () => {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const onValid = async (formData) => {
    const data = await signup(formData);
    setUserInformation(data);
    window.location.reload();
  };

  if (authContext.auth && authContext.auth.isLoggedIn) {
    // Redirect if the user is already logged in
    return <Redirect to="/" />;
  }

  return <Row align="middle" justify="center" className={css`margin: 200px 10px; `} >
    <Col xs={24} md={16} lg={10} >
      <Card title={t('signup.title')} >
        <Form
          name="signup"
          initialValues={{ remember: false }}
          onFinish={onValid}
        >
          <Form.Item
            label={t('signup.name')}
            name="displayName"
            rules={[{ required: true, message: t('signup.nameRequired') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('signup.email')}
            name="email"
            rules={[{ required: true, type: 'email', message: t('signup.emailRequired') }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label={t('signup.username')}
            name="username"
            rules={[{ required: true, message: t('signup.usernameRequired') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('signup.password')}
            name="password"
            rules={[{ required: true, message: t('signup.passwordRequired') }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={t('signup.confirmPassword')}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: t('signup.confirmPasswordRequired'),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t('signup.confirmPasswordMissmatch'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              {t('signup.signup')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/login" >{t('signup.login')}</Link>
          </Form.Item>
        </Form >
      </Card>
    </Col>
  </Row >;
};

export default withRouter(Signup);