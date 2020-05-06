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
import KtContent from "../../../_metronic/layout/KtContent";

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
            <KtContent><Dashboard/></KtContent>
          </UserLayout>
        )} exact/>

        <UserRoute path="/jobs/applied" component={() => (
          <UserLayout>
            <KtContent><JobsApplied/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/jobs/details/:jobId" component={() => (
          <UserLayout>
            <KtContent><JobDetails/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/interviews" component={() => (
          <UserLayout>
            <KtContent><Applications/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/interviews/:jobId" component={() => (
          <UserLayout>
            <KtContent><Interviews/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/tests" component={() => (
          <UserLayout>
            <KtContent><Applications/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/tests/:jobId" component={() => (
          <UserLayout>
            <KtContent><Tests/></KtContent>
          </UserLayout>
        )} exact/>
        <UserRoute path="/account" component={() => (
          <UserLayout>
            <KtContent><Account/></KtContent>
          </UserLayout>
        )} exact/>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;