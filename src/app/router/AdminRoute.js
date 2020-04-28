import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import * as routerHelpers from "./RouterHelpers";
import Dashboard from "../pages/admin/Dashboard";
import {Redirect, Route} from "react-router-dom";

const AdminRoute = ({path, component: Component, ...rest}) => {
  const { isAdmin } = useSelector(
    ({ auth }) => ({
      isAdmin: auth.user && auth.user.role === '2'
    }),
    shallowEqual
  );
  console.log('isAdmin', isAdmin)
  return (
    <Route {...rest} render={props => (
      isAdmin ? <Component {...props}/> : <Redirect to="/auth/login" />
    )}/>
  )

};

export default AdminRoute;