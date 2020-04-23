import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../../../_metronic/_assets/sass/pages/login/login-3.scss";
import Login from "./Login";
import Registration from "./Registration";

export default function AuthPage() {
  return (
      <>
        <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
          <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/registration" component={Registration} />
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </>
  );
}
