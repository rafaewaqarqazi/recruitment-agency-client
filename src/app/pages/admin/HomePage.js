import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "../home/Account";
import Jobs from "./Jobs/Jobs";
import Interviews from "./Interviews";
import Tests from "./Tests";
import NewJob from "./Jobs/NewJob";

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/jobs" component={Jobs} exact/>
        <Route path="/jobs/new" component={NewJob} exact/>
        <Route path="/jobs/edit/:jobId" component={NewJob} exact/>
        <Route path="/interviews" component={Interviews} />
        <Route path="/tests" component={Tests}/>
        <Route path="/account" component={Account}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
