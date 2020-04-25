import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Account from "./Account";

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/jobs" component={Dashboard} />
        <Route path="/interviews" component={Dashboard} />
        <Route path="/tests" component={Dashboard}/>
        <Route path="/account" component={Account}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
