import React from 'react';
import { css } from 'emotion';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const DesktopNavigation = ({ auth, cars, setSelectedCar, selectedCar }) => {
  return auth?.isLoggedIn ? <div className={css`
    @media only screen and (min-width: 992px) {
      display: none;
    }
    display: block;
    width: 100%;
    background-color: teal;
    height: 8%;
    z-index: 3;
  `} >
    I am the mobile navbar :)
  </div> : null;
}

export default DesktopNavigation;