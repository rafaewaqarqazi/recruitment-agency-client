import React, {useState} from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import { withRouter } from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeft";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import KtContent from "./KtContent";
import "./assets/Base.scss";
import '../../_metronic/_assets/sass/global/layout/header/skins/base/light.scss'
import '../../_metronic/_assets/sass/global/layout/header/skins/menu/light.scss'
import '../../_metronic/_assets/sass/global/layout/brand/skins/dark.scss'
import '../../_metronic/_assets/sass/global/layout/aside/skins/dark.scss'
import MainFooter from "../../app/Components/layout/main/MainFooter";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
const htmlClassService = new HTMLClassService();
const drawerWidth = 265;
const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: 20
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShiftLeft: {
    width: `calc(100% - ${70}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 97,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftLeft: {
    marginLeft: 70,
    width: `calc(100% - ${70}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}))

function Layout({children, layoutConfig}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true)
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);

  return (
    <LayoutInitializer
      styles={[]}
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}

      <div
        className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--fixed kt-subheader--solid kt-aside--enabled"
        style={{background: '#f2f3f8'}}
      >
        {/* <!-- begin::Body --> */}
        <HeaderMobile />
        <div className="d-flex kt-wrapper">
          <Hidden xsDown>
            <AsideLeft open={open} setOpen={setOpen}/>
          </Hidden>
          <div className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            [classes.appBarShiftLeft]: !open
          })}>
            <Header />

          </div>


          <main className={clsx(classes.content, classes.contentShift)}>
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
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display")
});

export default withRouter(connect(mapStateToProps)(Layout));
