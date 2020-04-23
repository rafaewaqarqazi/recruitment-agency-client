import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import objectPath from "object-path";
import * as builder from "../../ducks/builder";
import KTToggle from "../../_assets/js/toggle";

class HeaderMobile extends React.Component {
  toggleButtonRef = React.createRef();
  layoutConfig = this.props.layoutConfig;
  componentDidMount() {
    new KTToggle(this.toggleButtonRef.current, this.props.toggleOptions);
  }

  render() {
    return (
      <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
        <div className="kt-header-mobile__logo">
          <Link to="/">
            <img alt="Logo" src="/media/logos/logo-light.png"/>
          </Link>
        </div>
        <div className="kt-header-mobile__toolbar">
          <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left" id="kt_aside_mobile_toggler">
            <span/></button>
          <button className="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span/></button>
          <button className="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler">
            <i className="flaticon-more"/>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  headerMobileCssClasses: builder.selectors.getClasses(store, {
    path: "header_mobile",
    toString: true
  }),
  headerMobileAttributes: builder.selectors.getAttributes(store, {
    path: "header_mobile"
  }),
  asideDisplay: objectPath.get(
    store.builder.layoutConfig,
    "aside.self.display"
  ),
  toggleOptions: {
    target: "body",
    targetState: "kt-header__topbar--mobile-on",
    togglerState: "kt-header-mobile__toolbar-topbar-toggler--active"
  }
});

export default connect(mapStateToProps)(HeaderMobile);
