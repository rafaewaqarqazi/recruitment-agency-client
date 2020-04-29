import React, {useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../partials/content/Portlet";
import {getDepartment, getExperience} from "../../../utils/job-post-data";
import moment from "moment";
import {connect, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import {applyForJob} from "../../crud/job.crud";
import * as job from "../../store/ducks/jobs.duck";
import Tooltip from "@material-ui/core/Tooltip";

const JobCard = ({job, setSuccess, setError, jobEdit}) => {
  const { isUser, userId } = useSelector(
    ({ auth }) => ({
      isUser: auth.user && auth.user.role === '1',
      userId: auth.user && auth.user._id,
    })
  );
  const [show, setShow] = useState(false);
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
  return (
    <>
      <Portlet className=" kt-portlet--border-bottom-brand">
        <PortletHeader
          title={job.title}
        />
        <PortletBody>
          <h5>{getDepartment(job.department)}</h5>
          <div className='pt-2 pb-2'>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>No of Positions:</span>
              <span>{job.positions}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>Experience:</span>
              <span>{getExperience(job.experience)}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>Posted On:</span>
              <Tooltip title={moment(job.postedOn).calendar(null, {
                lastWeek: '[Last] dddd [at] h:mm A',
                sameElse: 'D MMMM YYYY [at] h:mm A'
              })} placement="top">
                <span>{moment(job.postedOn).fromNow()}</span>
              </Tooltip>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>Expire Date:</span>
              <span>{moment(job.dueDate).format('DD-MMM-YYYY')}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>Total Applications:</span>
              <span>{job.applications ? job.applications.length : 0}</span>
            </div>
          </div>

        </PortletBody>
        <PortletFooter>
          <div className='d-flex justify-content-end'>
            <Link to={`/jobs/details/${job._id}`}>
              <button className='btn btn-primary btn-sm'>View Job</button>
            </Link>

            {
              isUser &&
                <button
                  className={`btn btn-${moment().isAfter(job.dueDate) ? 'danger' : 'success'} btn-sm ml-3`}
                  onClick={handleShow}
                  disabled={
                    moment().isAfter(job.dueDate) ||
                    job.applications.filter(app => app === userId).length > 0
                  }
                >
                  Apply
                </button>
            }

          </div>
        </PortletFooter>
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
    </>
  );
};

export default connect(null, job.actions)(JobCard);