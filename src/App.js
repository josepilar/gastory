/* global gapi */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Menu, Button, Row, Col } from 'antd';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import axios from 'axios';

const documentKey = '1N8JjCUfGQHH7RULfxJdDh6_20JmJRaR0hInATBttKso';
const clientId = '397035199840-5fnvhn7iaakgnhnv99h2hc1sis6aan6p.apps.googleusercontent.com';

function App() {

  const [auth, setAuth] = useState();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});

  const setupStuff = (data) => {
    setAuth(data.Zi);
    setUser(data.w3);
  }

  const responseGoogle = async (user) => {
    setupStuff(gapi.auth2.getAuthInstance().currentUser.Ab);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    gapi.load('auth2', function(){
      const auth2 = gapi.auth2.init({
          client_id: clientId,
          scope: 'https://www.googleapis.com/auth/spreadsheets'
      });
      // auth2.ClientConfig({
       
      // })
      auth2.isSignedIn.listen((loggedIn) => {
        setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setupStuff(gapi.auth2.getAuthInstance().currentUser.Ab);
        }
      }); // This is what you use to listen for user changes
     });
  }, []);

  const loadData = async () => {
    const resp = await axios({
      method: 'post',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${documentKey}/values:batchGetByDataFilter`,
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`
      },
      data: {
        dataFilters: [
          {
            gridRange: {
              sheetId: 0,
              startRowIndex: 1
            }
          }
        ]
      }
    });
    console.log(resp);
    setData(resp);
  }

  const logout = () => setUser({});

  return (
    <Layout className='Container'>
      <Layout.Header className='header'>
        <Row>
          <Col span={12}>
            <div className="logo" />
            {isLoggedIn ? `Welcome ${user.ofa}` : 'Please login to start'}
          </Col>
          <Col span={3} offset={9}>
            {!isLoggedIn && <GoogleLogin
              clientId={clientId}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              discoveryDocs="https://sheets.googleapis.com/$discovery/rest?version=v4"
              scope="https://www.googleapis.com/auth/spreadsheets"
              render={renderProps => (<Button type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>)}
            />}
            {isLoggedIn && <GoogleLogout
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
            <br/>
            {isLoggedIn && <button style={{marginLeft: 'auto', marginRight: 'auto', position: 'abosulute'}} onClick={loadData}>load data</button>}
            <br/>
            {JSON.stringify(data)}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
