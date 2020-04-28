import React from 'react';
import {Link, Redirect, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {getCategory, getDepartment, getExperience, getQualification, getType} from "../../../utils/job-post-data";
import moment from "moment";

const JobDetails = () => {
  const params = useParams();
  const { jobsList, isUser } = useSelector(
    ({ jobs: {jobsList}, auth }) => ({
      jobsList,
      isUser: auth.user && auth.user.role === '1'
    })
  );
  const job = params.jobId ?
    jobsList.filter(j => j._id === params.jobId).length > 0 ?
      jobsList.filter(j => j._id === params.jobId)[0]
      : null
    : null
  if (!job) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
          <PortletHeader
            title={job.title}
            toolbar={
              <PortletHeaderToolbar>
                <div>{
                  moment().isAfter(job.dueDate)
                    ? <span className='btn btn-label-danger btn-sm btn-bold'>Expired</span>
                    : <span className='btn btn-label-success btn-sm btn-bold'>Active</span>
                }</div>
                {
                  isUser && !moment().isAfter(job.dueDate) &&
                  <button className='btn btn-label btn-bold btn-sm ml-3'>
                    Apply
                  </button>
                }
              </PortletHeaderToolbar>
            }
          />
          <PortletBody>
            <div className='row'>
              <div className="col-12 col-sm-6">
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Category:</span>
                  <span>{getCategory(job.category)}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Job Type:</span>
                  <span>{getType(job.type)}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Total Positions:</span>
                  <span>{job.positions || 'Not Specified'}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Required Qualifications:</span>
                  <div >
                    {job.qualifications.map(qualification => (
                      <div key={qualification}>{getQualification(qualification)}</div>
                    ))}
                  </div>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Required Experience:</span>
                  <span>{getExperience(job.experience)}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Total Applications:</span>
                  <span>{job.applications ? job.applications.length : 0}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Department:</span>
                  <span>{getDepartment(job.department)}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Posted On:</span>
                  <span>{moment(job.postedOn).format('DD-MMM-YYYY')}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='font-weight-bold'>Expire Date:</span>
                  <span>{moment(job.dueDate).format('DD-MMM-YYYY')}</span>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <h5>Description</h5>
                {job.description}
              </div>
            </div>
          </PortletBody>
        </Portlet>
      </div>
    );
  }
};

export default JobDetails;