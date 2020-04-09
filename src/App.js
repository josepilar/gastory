/* global gapi */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Button, Row, Col, Spin, Avatar, Icon, Empty } from 'antd';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import './App.css';

import Home from './components/Home';

import { setUpAxiosIdentity, getCars } from './services/gastory.service';
import { getUserInformation } from './helpers/identity_helper';
import { getDate } from './helpers/date.helper';
import { CLIENT_ID } from './constants';

const AuthContext = React.createContext({});

function App() {

  const [auth, setAuth] = useState({ user: {}, isLoggedIn: false });
  const [cars, setCars] = useState();

  const setupAuthenticationData = async (data) => {
    if (data) {
      setUpAxiosIdentity();
      setAuth({ ...auth, data: data.tokenObj, user: data.profileObj, isLoggedIn: true });
    }
  }


  const responseGoogle = async () => {
    const userInfo = gapi.auth2.getAuthInstance().currentUser.je;
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    window.location.reload();
  };

  useEffect(() => {
    const userInfo = getUserInformation();
    if (userInfo) setupAuthenticationData(userInfo);

    const getCarsData = async () => {
      const data = await getCars();
      setCars(data);
    }

    getCarsData();
  }, []);


  const logout = () => {
    setAuth({ user: {}, isLoggedIn: false });
    window.localStorage.removeItem('userInfo');
  };

  return (
    <Router>
      <AuthContext.Provider value={auth}>
        <Layout className='Container'>
          <Layout.Header className='header'>
            <Row>
              <Col span={15}>
                <Avatar src={auth.user.imageUrl} icon="user" />
                <span style={{ marginLeft: 16, verticalAlign: 'middle' }}>
                  {auth.isLoggedIn ? `Welcome ${auth.user.givenName}` : 'Please login to start'}
                </span>
              </Col>
              <Col span={4} offset={5}>
                {auth.isLoggedIn && <GoogleLogout
                  onLogoutSuccess={logout}
                  render={renderProps => (<Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Button>)}
                />}
              </Col>
            </Row>
          </Layout.Header>
          <Layout>
            {auth.isLoggedIn && <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
              <Menu mode='inline' className='Side' defaultOpenKeys={['cars']}>
                <Menu.SubMenu title='History'>
                  <Menu.Item>Test1</Menu.Item>
                  <Menu.Item>Test2</Menu.Item>
                </Menu.SubMenu>
                {cars && cars.length && <Menu.SubMenu title='Cars' key="cars" inlineCollapsed="false">
                  {cars && cars.map(car => <Menu.Item key={car._id}>{car.model}</Menu.Item>)}
                </Menu.SubMenu>}
              </Menu>
            </Layout.Sider>}
            <Layout>
              <Layout.Content className='MainContent'>
                {auth.isLoggedIn ? (
                  <Route exact path="/" render={props => <Home {...props} cars={cars} />} />
                ) :
                  <Empty description={
                    <GoogleLogin
                      clientId={CLIENT_ID}
                      onSuccess={responseGoogle}
                      scope="https://www.googleapis.com/auth/userinfo.profile"
                      render={renderProps => (<Button type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}><Icon type="google" />Login</Button>)} />
                  } image={<span />} />
                }
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
