import React from "react";
import Topbar from "./Topbar";
function Header() {
  return (
    <div className="kt-header kt-grid__item">
      <div className="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
        <div
          id="kt_header_menu"
          className="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default "
        >
          <ul className="kt-menu__nav ">
            <li
              className="kt-menu__item  kt-menu__item--open kt-menu__item--here kt-menu__item--submenu kt-menu__item--rel kt-menu__item--open kt-menu__item--here kt-menu__item--active"
            >
              <a href="#" className="kt-menu__link kt-menu__toggle">
                <span className="kt-menu__link-text">Pages</span>
                <i className="kt-menu__ver-arrow la la-angle-right"/>
              </a>
            </li>
            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel">
              <a href="#" className="kt-menu__link kt-menu__toggle">
                <span className="kt-menu__link-text">Features</span>
                <i className="kt-menu__ver-arrow la la-angle-right"/>
              </a>
            </li>
            <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--rel">
              <a href="#" className="kt-menu__link kt-menu__toggle">
                <span className="kt-menu__link-text">Apps</span>
                <i className="kt-menu__ver-arrow la la-angle-right"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Topbar />
    </div>
  );
}

export default Header;
