import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Row, Form, Input, Col, Card, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import { useQuery } from '../../helpers/router.helper';

import { resetPassword, changePassword, verifyToken } from '../../services/gastory.service';

async function isTokenValid(token) {
  const response = await verifyToken(token);
  return response.status === 200 && response?.data?.success ? response.data.success : false;
}


const ForgotPassword = () => {
  const query = useQuery(useLocation());
  const isReset = query.get('reset');

  const [successfullySent, SetSuccessfullySent] = useState(false);
  const [successfullyChanged, SetSuccessfullyChanged] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isReset) {
      isTokenValid(isReset).then(resp => {
        setIsValid(resp);
      })
    }
  }, []);

  const sendEmail = async (formData) => {
    await resetPassword(formData?.email);
    SetSuccessfullySent(true);
  };

  const handleChangePassword = async (formData) => {
    const resp = await changePassword(formData.password, formData.confirm, isReset);
    if (resp?.data?.success) SetSuccessfullyChanged(true);
  };

  return (
    <Row align="middle" justify="center" className={css`margin: 200px 10px;`}>
      <Col xs={24} md={16} lg={10} >
        {!isReset && <Card title="Forgot password">
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={sendEmail}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="email" />
            </Form.Item>

            {successfullySent && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message="Email sent"
                description="Check your inbox, we have sent you a reset link!"
                type="success" />
            </div>}

            <Form.Item >
              <Button type="primary" htmlType="submit">
                Send email
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login" >Login</Link>
            </Form.Item>
          </Form >
        </Card>}
        {isReset && isValid && <Card title="Choose Password">
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={handleChangePassword}
          >
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
            {successfullyChanged && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message="Password changed"
                description="Your password has been succefully changed."
                type="success" />
            </div>}
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Change password
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login" >Login</Link>
            </Form.Item>
          </Form >
        </Card>}
        {isReset && !isValid && <div className={css`background-color: white; padding: 30px`}>
          <Alert
            message="Expired"
            description="This reset link has expired or has been already used."
            type="error" />
        </div>}
      </Col>
    </Row >
  );
};

export default ForgotPassword;