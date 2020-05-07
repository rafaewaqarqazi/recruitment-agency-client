import React, {useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {getCategory, getDepartment, getExperience, getQualification, getType} from "../../../utils/job-post-data";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import {canApply} from "../../../utils";
import {Alert, Modal} from "react-bootstrap";
import {applyForJob} from "../../crud/job.crud";
import * as job from "../../store/ducks/jobs.duck";

const JobDetails = ({jobEdit}) => {
  const params = useParams();
  const { jobsList, isUser, userId } = useSelector(
    ({ jobs: {jobsList}, auth }) => ({
      jobsList,
      isUser: auth.user && auth.user.role === '1',
      userId: auth.user && auth.user._id
    })
  );
  const [show, setShow] = useState(false);
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  }
  const handleClickApply = () => {
    applyForJob({jobId: job._id, userId})
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleClose()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleClose()
          jobEdit(res.data.job)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not apply!'})
        handleClose()
        closeAlert()
      })
  }
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }
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
        <Alert show={success.show} variant="success">{success.message}</Alert>
        <Alert show={error.show} variant="danger">{error.message}</Alert>
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
                    canApply(job, userId) &&
                      <span className='btn btn-label-success btn-sm btn-bold ml-3'>Applied</span>
                  }
                </div>
                {
                  isUser &&
                  <button
                    className={`btn btn-${moment().isAfter(job.dueDate) ? 'danger' : 'success'} btn-sm ml-3`}
                    onClick={handleShow}
                    disabled={
                      moment().isAfter(job.dueDate) ||
                      canApply(job, userId)
                    }
                  >
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
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Apply for Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to proceed?</Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default btn-sm' onClick={handleClose}>
              Close
            </button>
            <button className='btn btn-primary btn-sm' onClick={handleClickApply}>
              Apply Now
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default connect(null, job.actions)(JobDetails);