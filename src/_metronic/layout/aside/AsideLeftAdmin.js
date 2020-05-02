import React from "react";
import {connect} from "react-redux";
import * as builder from "../../ducks/builder";
import {NavLink} from "react-router-dom";
import {List, ListItem} from '@material-ui/core'
import AsideMain from "./AsideMain";

function AsideLeftAdmin({open, setOpen}) {
  return (
    <AsideMain open={open} setOpen={setOpen}>
      <List className="kt-menu__nav ">
        <NavLink to="/dashboard" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className='kt-menu__link w-100'>
            <i className='kt-menu__link-icon fa fa-chart-bar'/>
            <span className="kt-menu__link-text">Dashboard</span>
          </ListItem>
        </NavLink>
        <NavLink to="/jobs" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-briefcase'/>
            <span className="kt-menu__link-text">Jobs</span>
          </ListItem>
        </NavLink>
        <NavLink to="/applications" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-book'/>
            <span className="kt-menu__link-text">Applications</span>
          </ListItem>
        </NavLink>
        <NavLink to="/tests" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-check-double'/>
            <span className="kt-menu__link-text">Tests</span>
          </ListItem>
        </NavLink>
        <NavLink to="/interviews" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-handshake'/>
            <span className="kt-menu__link-text">Interviews</span>
          </ListItem>
        </NavLink>
      </List>
    </AsideMain>
  );
}

const mapStateToProps = store => ({
  disableAsideSelfDisplay:
    builder.selectors.getConfig(store, "aside.self.display") === false,
  asideClassesFromConfig: builder.selectors.getClasses(store, {
    path: "aside",
    toString: true
  }),
  menuCanvasOptions: {
    baseClass: "kt-aside",
    overlay: true,
    closeBy: "kt_aside_close_btn",
    toggleBy: {
      target: "kt_aside_mobile_toggler",
      state: "kt-header-mobile__toolbar-toggler--active"
    }
  }
});

export default connect(mapStateToProps)(AsideLeftAdmin);
