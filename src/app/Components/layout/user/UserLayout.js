import React, {useState} from 'react';
import LayoutInitializer from "../../../../_metronic/layout/LayoutInitializer";
import MenuConfig from "../../../../_metronic/layout/MenuConfig";
import LayoutConfig from "../../../../_metronic/layout/LayoutConfig";
import HeaderMobile from "../../../../_metronic/layout/header/HeaderMobile";
import Header from "../../../../_metronic/layout/header/Header";
import SubHeader from "../../../../_metronic/layout/sub-header/SubHeader";
import KtContent from "../../../../_metronic/layout/KtContent";
import MainFooter from "../main/MainFooter";
import ScrollTop from "../../../partials/layout/ScrollTop";
import {withRouter} from "react-router-dom";
import HTMLClassService from "../../../../_metronic/layout/HTMLClassService";
const htmlClassService = new HTMLClassService();
const UserLayout = ({children}) => {
  // scroll to top after location changes
  window.scrollTo(0, 0);

  return (
    <LayoutInitializer
      styles={[]}
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      <div
        className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--fixed kt-subheader--solid kt-aside--enabled"
        style={{background: '#f2f3f8'}}
      >
        {/* <!-- begin::Body --> */}
        <HeaderMobile />
        <Header fixed={true}/>
        <div className="d-flex kt-wrapper">
          <main >
            <SubHeader/>
            <KtContent>{children}</KtContent>
            <MainFooter/>
          </main>
        </div>

        {/* <!-- end:: Body --> */}
      </div>
      <ScrollTop />
    </LayoutInitializer>
  )
};

export default withRouter(UserLayout);