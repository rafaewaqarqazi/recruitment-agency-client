import React, {useMemo, useState} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {
  Portlet,
  PortletBody, PortletFooter,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import {Link} from "react-router-dom";
import {departments, getDepartment, getExperience} from "../../../utils/job-post-data";
import moment from "moment";
import JobCard from "../../Components/jobs/JobCard";
import {Alert} from "react-bootstrap";

export default function Dashboard() {
  const { jobsList } = useSelector(
    ({ jobs: {jobsList} }) => ({
      jobsList
    })
  );
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  return (
    <>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <div className='row'>
        {
          jobsList.map(job => (
            <div className="col-12 col-sm-4" key={job._id}>
              <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
            </div>
          ))
        }
      </div>
    </>
  );
}
