import React, {Suspense} from 'react';
import {LayoutSplashScreen} from "../../../_metronic";
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import JobDetails from "../../Components/jobs/JobDetails";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";
import JobsApplied from "./JobsApplied";
import Interviews from "../admin/Interviews";
import Tests from "../admin/Tests";
import Applications from "../admin/Jobs/Applications";
import Home from "../Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import UserLayout from "../../Components/layout/user/UserLayout";
import {shallowEqual, useSelector} from "react-redux";

const UserPages = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>

        <Route path="/" component={Home} exact/>
        { !isAuthorized && <Route path="/auth/login" component={Login} exact/>}
        { !isAuthorized && <Route path="/auth/registration" component={Registration} exact/>}
        <Route path="/jobs/list" component={() => (
          <UserLayout>
            <Dashboard/>
          </UserLayout>
        )} exact/>

        <UserRoute path="/jobs/applied" component={() => (
          <UserLayout>
            <JobsApplied/>
          </UserLayout>
        )} exact/>
        <Route path="/jobs/details/:jobId" component={() => (
          <UserLayout>
            <JobDetails/>
          </UserLayout>
        )} exact/>
        <Route path="/interviews" component={() => (
          <UserLayout>
            <Applications/>
          </UserLayout>
        )} exact/>
        <Route path="/interviews/:jobId" component={() => (
          <UserLayout>
            <Interviews/>
          </UserLayout>
        )} exact/>
        <Route path="/tests" component={() => (
          <UserLayout>
            <Applications/>
          </UserLayout>
        )} exact/>
        <Route path="/tests/:jobId" component={() => (
          <UserLayout>
            <Tests/>
          </UserLayout>
        )} exact/>
        <UserRoute path="/account" component={() => (
          <UserLayout>
            <Account/>
          </UserLayout>
        )} exact/>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;