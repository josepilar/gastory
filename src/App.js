import React, { useEffect, useState } from 'react';
import md5 from 'blueimp-md5';
import { css } from 'emotion';
import { Layout, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './App.css';

import Routes from './components/Routes';
import DesktopNavigation from './components/Navigation/DesktopNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation';

import { setAuthToken, getCars } from './services/gastory.service';
import { getUserInformation, deleteUserInformation } from './helpers/identity_helper';

import AuthContext from './contexts/AuthContext';

function App() {

  const [auth, setAuth] = useState();
  const [cars, setCars] = useState();
  const [initialized, setInitialized] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

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
              <span style={{ marginLeft: 16, verticalAlign: 'middle' }}>
                {auth?.isLoggedIn ? `Welcome ${auth?.user?.displayName}` : 'Please login to start'}
              </span>
            </Col >
            <Col xs={4} className={css`text-align: right;`}>
              {auth?.isLoggedIn && <Button onClick={logout}>Logout</Button>}
            </Col>
          </Row >
        </Layout.Header >
        <Layout>
          <DesktopNavigation cars={cars} setSelectedCar={setSelectedCar} auth={auth} />
          <Layout css={css`@media only screen and (max-width: 992px) {
              margin-bottom: 8%;
            }`}>
            <Layout.Content className='MainContent'>
              <Routes cars={cars} selectedCar={selectedCar} initialized={initialized} />
            </Layout.Content>
          </Layout>
        </Layout>
        <MobileNavigation cars={cars} setSelectedCar={setSelectedCar} auth={auth} />
      </Layout >
    </AuthContext.Provider >
  );
}

export default App;
