import React from 'react';
import {Redirect, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {getCategory, getDepartment, getExperience, getQualification, getType} from "../../../utils/job-post-data";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

const JobDetails = () => {
  const params = useParams();
  const { jobsList, isUser, userId } = useSelector(
    ({ jobs: {jobsList}, auth }) => ({
      jobsList,
      isUser: auth.user && auth.user.role === '1',
      userId: auth.user && auth.user._id
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
                <div>
                  {
                    job.applications.filter(app => app === userId).length > 0 &&
                      <span className='btn btn-label-success btn-sm btn-bold ml-3'>Applied</span>
                  }
                </div>
                {
                  isUser && !moment().isAfter(job.dueDate) &&
                    job.applications.filter(app => app === userId).length === 0 &&
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
                  <Tooltip title={moment(job.postedOn).calendar(null, {
                    lastWeek: '[Last] dddd [at] h:mm A',
                    sameElse: 'D MMMM YYYY [at] h:mm A'
                  })} placement="top">
                    <span>{moment(job.postedOn).fromNow()}</span>
                  </Tooltip>
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