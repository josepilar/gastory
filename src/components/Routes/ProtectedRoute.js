import React, { useContext } from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

const ProtectedRoute = ({ location, children, ...rest }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.initialized) return null;
  if (!authContext?.auth?.isLoggedIn) {
    return <Redirect to="/login"/>
  }
  return <Route {...rest}>
    {children}
  </Route>
};

export default withRouter(ProtectedRoute);