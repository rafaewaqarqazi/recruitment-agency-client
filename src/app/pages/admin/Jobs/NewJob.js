import React, {Fragment, useState} from 'react';
import {Portlet, PortletBody} from "../../../partials/content/Portlet";
import {Form, Formik} from "formik";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import * as job from "../../../store/ducks/jobs.duck";
import JobsForm from "../../../Components/jobs/JobsForm";
import {jobPostValidations} from "../../../../utils/validations/jobPostValidations";
import {postJob} from "../../../crud/job.crud";
import { useHistory } from "react-router-dom";
const NewJob = ({ intl, addNewJob }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1.2rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "1.2rem" });
  };
  return (
    <div>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletBody>
          <h3>Job Details</h3>
          <Formik
            initialValues={{
              title: "",
              category: "",
              description: "",
              department: "",
              type: "",
              dueDate: "",
              qualifications: [],
              experience: ""
            }}
            validate={jobPostValidations}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              console.log('values', values)
              postJob(values)
                .then(res => {
                  if (!res.data.success) {
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_REGISTRATION",
                        defaultMessage: res.data.message
                      })
                    );
                  } else {
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.REGISTRATION_SUCCESS",
                        defaultMessage: "Successfully Posted Job!"
                      })
                    );
                    addNewJob(res.data.job)
                    setTimeout(() => {
                      history.push("/jobs");
                    }, 2000);
                  }
                  disableLoading();
                })
                .catch(error => {
                  disableLoading();
                  setSubmitting(false);
                  setStatus(
                    intl.formatMessage({
                      id: "AUTH.VALIDATION.INVALID_REGISTRATION",
                      defaultMessage: "Something Went Wrong!"
                    })
                  );
                });
            }}
          >
            {({
                values,
                status,
                errors,
                handleSubmit,
                validateForm,
                setFieldValue
              }) => (
              <Fragment>
                <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v3__wrapper">
                  <div className="kt-form">
                    <Form onSubmit={handleSubmit}>
                      {status && status !== "Successfully Registered!" && (
                        <div role="alert" className="alert alert-danger">
                          <div className="alert-text">{status}</div>
                        </div>
                      )}
                      {status && status === "Successfully Registered!" && (
                        <div role="alert" className="alert alert-success">
                          <div className="alert-text">{status}</div>
                        </div>
                      )}
                      <JobsForm errors={errors} values={values} setFieldValue={setFieldValue} loading={loading} loadingButtonStyle={loadingButtonStyle}/>
                    </Form>
                  </div>
                </div>
              </Fragment>
            )}
          </Formik>
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default injectIntl(connect(null, job.actions)(NewJob));