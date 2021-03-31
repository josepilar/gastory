import React, { useEffect, useState } from 'react';
import md5 from 'blueimp-md5';
import { css } from 'emotion';
import { Layout, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './App.css';

import Routes from './components/Routes';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation';
import NewTripDrawer from './components/Trips/newTripDrawer';

import { setAuthToken, getCars } from './services/gastory.service';
import { getUserInformation, deleteUserInformation } from './helpers/identity_helper';
import { hideOnMobile } from './constants';

import AuthContext from './contexts/AuthContext';

function App() {

  const [auth, setAuth] = useState();
  const [cars, setCars] = useState();
  const [initialized, setInitialized] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    const userInfo = getUserInformation();

    const getCarsData = async () => {
      const data = await getCars();
      setCars(data);
      setSelectedCar(data?.find(car => car.default)?._id);
    };
    if (userInfo) {
      setAuthToken(userInfo.token);
      setAuth(userInfo)
      getCarsData();
    } else {
      setAuth({ isLoggedIn: false });
    }
    setInitialized({ initialized: true });
  }, []);

  const logout = () => {
    setAuth({ user: {}, isLoggedIn: false, token: '' });
    deleteUserInformation();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, initialized }}>
      <Layout className='Container'>
        <Layout.Header className='header'>
          <Row>
            <Col xs={20}>
              <Avatar src={auth?.user?.profilePicture || (auth?.user?.email && `https://www.gravatar.com/avatar/${md5(auth?.user?.email.trim().toLowerCase())}`)} icon={<UserOutlined />} />
              <span style={{ margin: 16, verticalAlign: 'middle' }}>
                {auth?.isLoggedIn ? `${t('home.header.welcome')} ${auth?.user?.displayName}` : t('home.header.login')}
              </span>
              {auth?.isLoggedIn && <Button type="link" icon={<LogoutOutlined />} onClick={logout}>{t('home.header.logout')}</Button>}
            </Col >
            <Col xs={4} className={css`text-align: right;`} className={css(hideOnMobile)}>
              {auth?.isLoggedIn && <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => setVisible(true)}>{t('home.header.addFuelUp')}</Button>}
            </Col>
          </Row >
        </Layout.Header >
        <Layout>
          <DesktopNavigation cars={cars} setSelectedCar={setSelectedCar} auth={auth} />
          <Layout css={css`@media only screen and (max-width: 992px) {
              margin-bottom: 10%;
            }`}>
            <Layout.Content className='MainContent'>
              <Routes cars={cars} selectedCar={selectedCar} initialized={initialized} />
            </Layout.Content>
          </Layout>
        </Layout>
        <MobileNavigation cars={cars} setSelectedCar={setSelectedCar} auth={auth} />
      </Layout >
      <NewTripDrawer 
        title="Add new trip"
        visible={visible}
        onClose={() => setVisible(false)}
        bodyStyle={{ paddingBottom: 80 }}/>
    </AuthContext.Provider >
  );
}

export default App;
