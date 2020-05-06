import React from 'react';
import Topbar from "./Topbar";
import Brand from "../brand/Brand";
import {NavLink} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import * as routerHelpers from "../../../app/router/RouterHelpers";

const HeaderUser = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <div className="kt-header kt-grid__item" style={{position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000}}>
      <div className="kt-header-menu-wrapper flex-grow-1" >
        <div className="container d-flex align-items-center">
          <Brand/>
          <NavLink to="/jobs/list" activeClassName='active' className="btn btn-link nav-link ml-3">Jobs List</NavLink>
          {
            isAuthorized && <NavLink to="/jobs/applied" activeClassName='active' className="btn btn-link nav-link ml-3">Jobs Applied</NavLink>
          }
          <NavLink to="/interviews" activeClassName='active' className="btn btn-link nav-link ml-3">Interviews</NavLink>
          <NavLink to="/tests" activeClassName='active' className="btn btn-link nav-link ml-3">Tests</NavLink>
        </div>
      </div>
      <Topbar />
    </div>
  );
};

export default HeaderUser;