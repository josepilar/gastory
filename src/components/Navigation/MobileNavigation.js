import React from 'react';
import { CarTwoTone, DashboardTwoTone,SmileTwoTone, SettingTwoTone } from '@ant-design/icons';
import { css } from 'emotion';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

import { Wrapper, NavItem } from './MobileNavigation.styles';

const MobileNavigation = ({ auth, cars, setSelectedCar, selectedCar }) => {
  return auth?.isLoggedIn ? <Wrapper>
    <NavItem>
      <DashboardTwoTone twoToneColors="#4b4b4b" />
    </NavItem>
    <NavItem>
      <CarTwoTone twoToneColors="#4b4b4b" />
    </NavItem>
    <NavItem>
      <SmileTwoTone />
    </NavItem>
    <NavItem>
      <SettingTwoTone />
    </NavItem>
  </Wrapper> : null;
}

export default MobileNavigation;