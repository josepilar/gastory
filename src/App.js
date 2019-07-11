/* global gapi */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const documentKey = '1N8JjCUfGQHH7RULfxJdDh6_20JmJRaR0hInATBttKso';
const clientId = '397035199840-5fnvhn7iaakgnhnv99h2hc1sis6aan6p.apps.googleusercontent.com';

function App() {

  const [user, setUser] = useState();

  const responseGoogle = async (user) => {
    setUser(user);
    localStorage.setItem('gastoryUser', JSON.stringify(user));
  };

  useEffect(() => {
    const localUser = localStorage.getItem('gastoryUser');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const loadData = async () => {
    const resp = await axios({
      method: 'post',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${documentKey}/values:batchGetByDataFilter`,
      headers: {
        Authorization: `${user.tokenObj.token_type} ${user.tokenObj.access_token}`
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
  }

  return (
    <Layout className='Container'>
      <Layout.Header className='header'>
        <div className="logo" />
        TEST
      </Layout.Header>
      <Layout>
        <Layout.Sider breakpoint="lg" collapsedWidth="0" width={200}>
          <Menu mode='inline' className='Side'>
            <Menu.SubMenu title='tests'>
              <Menu.Item>Test1</Menu.Item>
              <Menu.Item>Test2</Menu.Item>
              <Menu.Item>Test3</Menu.Item>
              <Menu.Item>Test4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title='perros'>
            <Menu.Item>Perro1</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
              <Menu.Item>Perro2</Menu.Item>
              <Menu.Item>Perro3</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Content className='MainContent'>
            {!user && <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              discoveryDocs="https://sheets.googleapis.com/$discovery/rest?version=v4"
              scope="https://www.googleapis.com/auth/spreadsheets"
            />}
            <br/>
            <button style={{marginLeft: 'auto', marginRight: 'auto', position: 'abosulute'}} onClick={loadData}>load data</button>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
