import React, { useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { css } from 'emotion';

import { signup } from '../../services/gastory.service';
import { setUserInformation } from '../../helpers/identity_helper';

import AuthContext from '../../contexts/AuthContext';

const Signup = () => {
  const authContext = useContext(AuthContext);
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
      <Card title="Sign up" >
        <Form
          name="signup"
          initialValues={{ remember: false }}
          onFinish={onValid}
        >
          <Form.Item
            label="Display name"
            name="displayName"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/login" >Login</Link>
          </Form.Item>
        </Form >
      </Card>
    </Col>
  </Row >;
};

export default withRouter(Signup);