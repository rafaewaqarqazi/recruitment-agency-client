import React, {Suspense} from 'react';
import {LayoutSplashScreen} from "../../../_metronic";
import {Redirect, Switch} from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import JobDetails from "../../Components/jobs/JobDetails";
import Interviews from "../admin/Interviews";
import Tests from "../admin/Tests";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";

const UserPages = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/jobs/list" />
        }
        <UserRoute path="/jobs/list" component={Dashboard} />
        <UserRoute path="/jobs/details/:jobId" component={JobDetails} exact/>
        <UserRoute path="/jobs/applied" component={Interviews} />
        <UserRoute path="/interviews" component={Tests}/>
        <UserRoute path="/tests" component={Tests}/>
        <UserRoute path="/account" component={Account}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;