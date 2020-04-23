import React, {useState} from 'react';
import LoginLayout from "../../Components/layout/login/LoginLayout";
import {Field, Form, Formik} from "formik";
import {loginWithCode} from "../../crud/auth.crud";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import * as auth from "../../store/ducks/auth.duck";

const MultiFactorAuth = ({ intl, login }) => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  return (
    <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
      <LoginLayout heading="Two Factor Authentication">
        <Formik
          initialValues={{ code: "" }}
          validate={values => {
            const errors = {};
            if (!values.code) {
              errors.code = 'Code is Required!'
            }
            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            enableLoading()
            setTimeout(() => {
              loginWithCode(values.code)
                .then((res) => {
                  disableLoading()
                  setSubmitting(false);
                  login(res.data.authToken);
                })
                .catch(() => {
                  disableLoading()
                  setSubmitting(false);
                  setStatus('Could not verify Code!');
                });
            }, 1000)
          }}
        >
          {({status, handleSubmit, isSubmitting}) => (
            <Form className="kt-form" onSubmit={handleSubmit}>
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}
              <div className="text-body text-center">
                Please Enter Security Code to Proceed
              </div>
              <div className="input-group">
                <Field
                  name="code"
                  className="form-control"
                  placeholder="Security Code"
                  required
                />
              </div>
              <div className="kt-login__actions">
                <button
                  // className="btn btn-brand btn-elevate kt-login__btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                    {
                      "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                    }
                  )}`}
                  style={loadingButtonStyle}
                >
                  Verify Code
                </button>
              </div>
              <div className="kt-login__account">
                <span className="kt-login__account-msg">
                  Return to Login Page ?
                </span>
                &nbsp;&nbsp;
                <Link to="/auth/login" className="kt-login__account-link">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </div>
  );
};

export default injectIntl(connect(null, auth.actions)(MultiFactorAuth));