import React from 'react';
import { css } from 'emotion';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const DesktopNavigation = ({ auth, cars, setSelectedCar, selectedCar }) => {
  return auth?.isLoggedIn ? <Layout.Sider className={css`@media only screen and (max-width: 991px) {
    display: none;
  }`} breakpoint="lg" collapsedWidth="0" width={300}>
    <Menu mode='inline' className='Side' defaultOpenKeys={['cars', 'home']} selectedKeys={[selectedCar]}>
      <Menu.SubMenu title='Home' key="home">
        <Menu.Item><Link to="/cars">Profile</Link></Menu.Item>
        <Menu.Item><Link to="/cars">Cars</Link></Menu.Item>
      </Menu.SubMenu>
      {cars && cars.length && <Menu.SubMenu title='Select Car' key="cars" inlineCollapsed="false">
        {cars && cars.map(car => <Menu.Item key={car._id} onClick={() => setSelectedCar(car._id)} ><Link to="/">{car.maker} - {car.model}</Link></Menu.Item>)}
      </Menu.SubMenu>}
    </Menu>
  </Layout.Sider> : null;
}

export default DesktopNavigation;