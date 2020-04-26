import React, { useEffect, useState } from 'react';
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import md5 from 'blueimp-md5';
import { css } from 'emotion';
import { Layout, Menu, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Cars from './components/Cars';

import { setAuthToken, getCars } from './services/gastory.service';
import { getUserInformation, deleteUserInformation } from './helpers/identity_helper';

import AuthContext from './contexts/AuthContext';

function App({ location }) {

  const [auth, setAuth] = useState();
  const [cars, setCars] = useState();
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
  }, []);

  const logout = () => {
    setAuth({ user: {}, isLoggedIn: false, token: '' });
    deleteUserInformation();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
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
          {auth?.isLoggedIn && <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
            <Menu mode='inline' className='Side' defaultOpenKeys={['cars', 'home']} selectedKeys={[selectedCar]}>
              <Menu.SubMenu title='Home' key="home">
                <Menu.Item><Link to="/cars">Profile</Link></Menu.Item>
                <Menu.Item><Link to="/cars">Cars</Link></Menu.Item>
              </Menu.SubMenu>
              {cars && cars.length && <Menu.SubMenu title='Select Car' key="cars" inlineCollapsed="false">
                {cars && cars.map(car => <Menu.Item key={car._id} onClick={() => setSelectedCar(car._id)} ><Link to="/">{car.maker} - {car.model}</Link></Menu.Item>)}
              </Menu.SubMenu>}
            </Menu>
          </Layout.Sider>}
          <Layout>
            <Layout.Content className='MainContent'>
              <Route exact path="/" render={props => <Home {...props} cars={cars} carSelected={selectedCar} />} />
              <Route exact path="/cars" render={props => <Cars {...props} cars={cars} />} />
              {auth && auth?.isLoggedIn && (location.pathname === '/login' && location.pathname === '/signup' && location.pathname === '/whoopsis') && <Route render={props => <Redirect to="/" />} />}
              <Route exact path="/login" render={props => <Login {...props} />} />
              <Route exact path="/signup" render={props => <Signup {...props} />} />
              <Route exact path="/whoopsis" render={props => <ForgotPassword {...props} />} />
              {auth && !auth?.isLoggedIn && (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/whoopsis') && <Redirect to="/login" />}
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout >
    </AuthContext.Provider >
  );
}

export default withRouter(App);
