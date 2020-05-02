import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../Account";
import Jobs from "./Jobs/Jobs";
import Interviews from "./Interviews";
import Tests from "./Tests";
import NewJob from "./Jobs/NewJob";
import AdminRoute from "../../router/AdminRoute";
import JobDetails from "../../Components/jobs/JobDetails";
import Applications from "./Jobs/Applications";
import ApplicationsSingle from "./Jobs/ApplicationsSingle";

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
        <AdminRoute path="/applications" component={Applications} exact/>
        <AdminRoute path="/applications/:jobId" component={ApplicationsSingle} exact/>
        <AdminRoute path="/interviews" component={Applications} exact/>
        <AdminRoute path="/interviews/:jobId" component={Interviews} exact/>
        <AdminRoute path="/tests" component={Applications} exact/>
        <AdminRoute path="/tests/:jobId" component={Tests} exact/>
        <AdminRoute path="/account" component={Account} exact/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
