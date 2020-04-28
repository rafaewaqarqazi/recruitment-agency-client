import React, { useMemo } from "react";
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

export default function Dashboard() {
  const { jobsList } = useSelector(
    ({ jobs: {jobsList} }) => ({
      jobsList
    })
  );
  return (
    <div className='row'>
      {
        jobsList.map(job => (
          <div className="col-12 col-sm-4" key={job._id}>
            <JobCard job={job}/>
          </div>
        ))
      }
    </div>
  );
}
