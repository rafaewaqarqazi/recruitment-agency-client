import React, {Fragment, useEffect, useState} from 'react';
import {Portlet, PortletBody} from "../../../partials/content/Portlet";
import {Form, Formik} from "formik";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import * as job from "../../../store/ducks/jobs.duck";
import JobsForm from "../../../Components/jobs/JobsForm";
import {jobPostValidations} from "../../../../utils/validations/jobPostValidations";
import {postJob, editJob} from "../../../crud/job.crud";
import { useHistory, useParams } from "react-router-dom";

const NewJob = ({ intl, addNewJob, jobsList, jobEdit }) => {
  const history = useHistory();
  const params = useParams();
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
  const initialState = {
    title: "",
    category: "",
    description: "",
    department: "",
    type: "",
    dueDate: "",
    qualifications: [],
    experience: ""
  }
  const response = ({res, setStatus}) => {
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
          defaultMessage: history.location.pathname.includes('/jobs/edit') ? "Successfully Edited Job!" : "Successfully Posted Job!"
        })
      );
      history.location.pathname.includes('/jobs/edit') ? jobEdit(res.data.job)
        : addNewJob(res.data.job)
      setTimeout(() => {
        history.push("/jobs");
      }, 2000);
    }
    disableLoading();
  }
  const catchError = ({setSubmitting, setStatus}) => {
    disableLoading();
    setSubmitting(false);
    setStatus(
      intl.formatMessage({
        id: "AUTH.VALIDATION.INVALID_REGISTRATION",
        defaultMessage: "Something Went Wrong!"
      })
    );
  }
  return (
    <div>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletBody>
          <h3>Job Details</h3>
          <Formik
            initialValues={
              params.jobId ?
                jobsList.filter(j => j._id === params.jobId).length > 0 ?
                  jobsList.filter(j => j._id === params.jobId)[0]
                  : initialState
                : initialState
            }
            validate={jobPostValidations}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              console.log('values', values)
              history.location.pathname.includes('/jobs/edit')
              ? editJob(values)
                  .then(res => {
                    response({res, setStatus})
                  })
                  .catch(error => {
                    catchError({setSubmitting, setStatus})
                  })
              : postJob(values)
                .then(res => {
                  response({res, setStatus})
                })
                .catch(error => {
                  catchError({setSubmitting, setStatus})
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
                      {status && status !== "Successfully Registered!" && status !== "Successfully Edited Job!" && (
                        <div role="alert" className="alert alert-danger">
                          <div className="alert-text">{status}</div>
                        </div>
                      )}
                      {status && (status === "Successfully Posted Job!" || status === "Successfully Edited Job!") && (
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
const mapStateToProps = ({ jobs: {jobsList} }) => ({
  jobsList
});

export default injectIntl(connect(mapStateToProps, job.actions)(NewJob));