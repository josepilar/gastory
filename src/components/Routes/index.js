import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import ForgotPassword from '../ForgotPassword';
import Cars from '../Cars';
import ProtectedRoute from './ProtectedRoute';

const Routes = ({ cars, selectedCar, initialized }) => {
  if (!initialized) return null;
  return <>
    <ProtectedRoute exact path="/">
      <Home cars={cars} carSelected={selectedCar} />
    </ProtectedRoute>
    <ProtectedRoute exact path="/cars" >
      <Cars cars={cars} />
    </ProtectedRoute>
    <Route exact path="/login" render={props => <Login {...props} />} />
    <Route exact path="/signup" render={props => <Signup {...props} />} />
    <Route exact path="/whoopsis" render={props => <ForgotPassword {...props} />} />
  </>
};

export default Routes;