/* global gapi */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Button, Row, Col, notification, Avatar } from 'antd';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

import './App.css';

import Home from './components/Home';

import { listenForUserChanges } from './helpers/gapi_helper';
import { getDate } from './helpers/date.helper';
import { CLIENT_ID } from './constants';
import { loadAllHistoryData, setUpAxiosAuth } from './services/gastory.service';

const AuthContext = React.createContext({});

function App() {

  const [auth, setAuth] = useState({ user: {}, isLoggedIn: false });
  const [history, setHistory] = useState();
  const [cars, setCars] = useState();

  const setupAuthenticationData = async (data) => {
    setAuth({ ...auth, data: data.Zi, user: data.w3, isLoggedIn: true });
    setUpAxiosAuth(data.Zi);
    if (!history) {
      setHistory([]);
      try {
        setHistory(await loadAllHistoryData());
        notification.success({message: 'Gas History Loaded', placement: 'bottomRight'});
      } catch (error) {
        notification.error({message: 'Error loading history',  placement: 'bottomRight'});
      }
    }
  }

  const responseGoogle = async () => {
    setupAuthenticationData(gapi.auth2.getAuthInstance().currentUser.Ab);
    setAuth({ ...auth, isLoggedIn: true });
  };

  useEffect(() => {
    listenForUserChanges(setupAuthenticationData);
  }, []);


  const logout = () => {
    setHistory();
    setAuth({ user: {}, isLoggedIn: false })
  };

  return (
    <Router>
      <AuthContext.Provider value={auth}>
        <Layout className='Container'>
          <Layout.Header className='header'>
            <Row>
              <Col span={15}>
                <Avatar src={auth.user.Paa} icon="user" /> 
                <span style={{ marginLeft: 16, verticalAlign: 'middle' }}>
                  {auth.isLoggedIn ? `Welcome ${auth.user.ofa}` : 'Please login to start'}
                </span>
              </Col>
              <Col span={3} offset={6}>
                {!auth.isLoggedIn && <GoogleLogin
                  clientId={CLIENT_ID}
                  onSuccess={responseGoogle}
                  discoveryDocs="https://sheets.googleapis.com/$discovery/rest?version=v4"
                  scope="https://www.googleapis.com/auth/spreadsheets"
                  render={renderProps => (<Button type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>)}
                />}
                {auth.isLoggedIn && <GoogleLogout
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                  render={renderProps => (<Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Button>)}
                />}
              </Col>
            </Row>
          </Layout.Header>
          <Layout>
            <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
              <Menu mode='inline' className='Side'>
                <Menu.SubMenu title='History'>
                  <Menu.Item>Test1</Menu.Item>
                  <Menu.Item>Test2</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title='Cars'>
                  <Menu.Item>Cars</Menu.Item>
                  <Menu.Item>Perro2</Menu.Item>
                  <Menu.Item>Perro3</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Layout.Sider>
            <Layout>
              <Layout.Content className='MainContent'>
                <Route exact path="/" render={props => <Home {...props} history={history}/>} />
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
