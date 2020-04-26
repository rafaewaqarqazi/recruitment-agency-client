import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../../../app/partials/layout/UserProfile";

class HeaderMobile extends React.Component {
  render() {
    return (
      <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
        <div className="kt-header-mobile__logo">
          <Link to="/">
            <img alt="Logo" src="/media/logos/recruitment-agency-logo.png" width={40}/>
          </Link>
        </div>
        <div className="kt-header-mobile__toolbar">
          <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left mr-2" >
            <span/>
          </button>
          <UserProfile/>
        </div>
      </div>
    );
  }
}



export default HeaderMobile;
