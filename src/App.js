import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';

function App() {
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
          <Layout.Content className='MainContent'>Here goes the dinamic content heuheu</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
