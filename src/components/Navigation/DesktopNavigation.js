import React from 'react';
import { css } from 'emotion';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';

const DesktopNavigation = ({ auth, cars, setSelectedCar, selectedCar }) => {
  const { t } = useTranslation();
  return auth?.isLoggedIn ? <Layout.Sider className={css`@media only screen and (max-width: 991px) {
    display: none;
  }`} breakpoint="lg" collapsedWidth="0" width={300}>
    <Menu mode='inline' className='Side' defaultOpenKeys={['cars', 'home']} selectedKeys={[selectedCar]}>
      <Menu.SubMenu title={t('home.nav.home.title')} key="home">
        <Menu.Item><Link to="/cars">{t('home.nav.home.profile')}</Link></Menu.Item>
        <Menu.Item><Link to="/cars">{t('home.nav.home.cars')}</Link></Menu.Item>
      </Menu.SubMenu>
      {cars && cars.length && <Menu.SubMenu title={t('home.nav.carList.title')} key="cars" inlineCollapsed="false">
        {cars && cars.map(car => <Menu.Item key={car._id} onClick={() => setSelectedCar(car._id)} ><Link to="/">{car.maker} - {car.model}</Link></Menu.Item>)}
      </Menu.SubMenu>}
    </Menu>
  </Layout.Sider> : null;
}

export default DesktopNavigation;