import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../home/Account";
import Jobs from "./Jobs/Jobs";
import Interviews from "./Interviews";
import Tests from "./Tests";
import NewJob from "./Jobs/NewJob";
import AdminRoute from "../../router/AdminRoute";
import JobDetails from "../../Components/jobs/JobDetails";

export default function AdminPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <AdminRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/jobs" component={Jobs} exact/>
        <AdminRoute path="/jobs/new" component={NewJob} exact/>
        <AdminRoute path="/jobs/edit/:jobId" component={NewJob} exact/>
        <AdminRoute path="/jobs/details/:jobId" component={JobDetails} exact/>
        <AdminRoute path="/interviews" component={Interviews} />
        <AdminRoute path="/tests" component={Tests}/>
        <AdminRoute path="/account" component={Account}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
