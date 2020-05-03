import React, {Suspense} from 'react';
import {LayoutSplashScreen} from "../../../_metronic";
import {Redirect, Switch} from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import JobDetails from "../../Components/jobs/JobDetails";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";
import JobsApplied from "./JobsApplied";
import Interviews from "../admin/Interviews";
import Tests from "../admin/Tests";
import Applications from "../admin/Jobs/Applications";

const UserPages = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/jobs/list" />
        }
        <UserRoute path="/jobs/list" component={Dashboard} exact/>

        <UserRoute path="/jobs/applied" component={JobsApplied} exact/>
        <UserRoute path="/jobs/details/:jobId" component={JobDetails} exact/>
        <UserRoute path="/interviews" component={Applications} exact/>
        <UserRoute path="/interviews/:jobId" component={Interviews} exact/>
        <UserRoute path="/tests" component={Applications} exact/>
        <UserRoute path="/tests/:jobId" component={Tests} exact/>
        <UserRoute path="/account" component={Account} exact/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;