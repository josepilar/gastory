import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Button, Row, Form, Input, Col, Card, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    if (isReset) {
      isTokenValid(isReset).then(resp => {
        setIsValid(resp);
      })
    }
  }, [isReset]);

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
        {!isReset && <Card title={t('forgotPassword.title')}>
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={sendEmail}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: t('forgotPassword.emailError') }]}
            >
              <Input prefix={<UserOutlined />} placeholder={t('forgotPassword.email')} />
            </Form.Item>

            {successfullySent && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message={t('forgotPassword.alertMessage')}
                description={t('forgotPassword.alertDescription')}
                type="success" />
            </div>}

            <Form.Item >
              <Button type="primary" htmlType="submit">
                {t('forgotPassword.send')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login" >{t('forgotPassword.login')}</Link>
            </Form.Item>
          </Form >
        </Card>}
        {isReset && isValid && <Card title={t('forgotPassword.passwordReset.title')}>
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={handleChangePassword}
          >
            <Form.Item
              label={t('forgotPassword.passwordReset.password')}
              name="password"
              rules={[{ required: true, message: t('forgotPassword.passwordReset.requiredPassword')}]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={t('forgotPassword.passwordReset.confirmPassword')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('forgotPassword.passwordReset.confirmPasswordRequired'),
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t('forgotPassword.passwordReset.passwordsMissmatch'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            {successfullyChanged && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message={t('forgotPassword.passwordReset.alertPasswordChangedTitle')}
                description={t('forgotPassword.passwordReset.alertPasswordChangedDescription')}
                type="success" />
            </div>}
            <Form.Item >
              <Button type="primary" htmlType="submit">
              {t('forgotPassword.passwordReset.changePassword')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login" >{t('forgotPassword.login')}</Link>
            </Form.Item>
          </Form >
        </Card>}
        {isReset && !isValid && <div className={css`background-color: white; padding: 30px`}>
          <Alert
            message={t('forgotPassword.passwordReset.alertPasswordExpiredTitle')}
            description={t('forgotPassword.passwordReset.alertPasswordExpiredDescription')}
            type="error" />
        </div>}
      </Col>
    </Row >
  );
};

export default ForgotPassword;