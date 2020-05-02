import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {useHistory, useParams} from "react-router-dom";
import {selectRejectCandidate, changeTestInterviewStatus} from "../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getTestInterviewStatus} from "../../../utils";
import {Tooltip} from "@material-ui/core";
import moment from "moment";

const Interviews = ({jobsList, jobEdit}) => {
  const history = useHistory()
  const params = useParams()
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [job, setJob] = useState(false);
  const [applications, setApplications] = useState([]);
  const [date, handleChangeDate] = useState(new Date())
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [selectAll, setSelectAll] = useState(false);
  const [statusData, setStatusData] = useState({applicationId: '', status: ''})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = (applicationId, status) => {
    setStatusData({applicationId, status})
    setShowStatus(true);
  }
  useEffect(() => {
    const data = jobsList.filter(job => job._id === params.jobId)
    if (data.length === 0) {
      history.push('/applications')
    } else {
      setJob(data[0])
      setApplications(data[0].applications.filter(app => app.interview).map(app => ({...app, checked: false})))
    }
  }, [jobsList])
  const onCheckAll = () => {
    setApplications(applications.map(application => {
      return {...application, checked: application.status === '3' && application.interview.status === '2' ? !selectAll : false}
    }))
    setSelectAll(!selectAll)
  }
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }
  const onCheckSingle = id => {
    setApplications(applications.map(application => {
      if (application._id === id) {
        return {...application, checked: !application.checked}
      } else {
        return application
      }
    }))
  }
  const handleSelectCandidate = () => {
    const applicationsIds = applications.filter(application => application.checked)
      .map(app => app._id)
    selectRejectCandidate({applicationsIds, jobId: job._id, status: '4'})
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
        setError({show: true, message: 'Could not perform this action'})
        handleClose()
        closeAlert()
      })
  }
  const handleChangeStatus = () => {
    changeTestInterviewStatus({jobId: job._id, type: 'interview', ...statusData})
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleCloseStatus()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleCloseStatus()
          jobEdit(res.data.job)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not Perform this action'})
        handleCloseStatus()
        closeAlert()
      })
  }
  return (
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title={`${job.title} Applications`}
          toolbar={
            <PortletHeaderToolbar>
              <button className='btn btn-label btn-bold btn-sm' onClick={handleShow} disabled={applications.filter(app => app.checked).length === 0}>
                <i className='fa fa-clock'/> Select Candidates
              </button>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <Table responsive>
            <thead>
            <tr>
              <th><input type="checkbox" className='form-check' disabled={applications.filter(app => app.interview.status === '2').length === 0} checked={selectAll} onChange={onCheckAll}/></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>CV</th>
              <th>Interview Status</th>
              <th>Interview Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              applications.length === 0
                ? <tr >
                  <td colSpan={8} style={{textAlign: 'center'}}>No Applications Found</td>
                </tr>
                : applications.map((application, i) => (
                  <tr key={i}>
                    <td><input type="checkbox" className='form-check' disabled={application.interview.status !== '2' || parseInt(application.status) > 3} checked={application.checked} onChange={() => onCheckSingle(application._id)}/></td>
                    <td>{application.user.firstName}</td>
                    <td>{application.user.lastName}</td>
                    <td>{application.user.email}</td>
                    <td>{application.user.cv ? application.cv.filename : 'Not Provided'}</td>
                    <td>{getTestInterviewStatus(application.interview.status)}</td>
                    <td>{moment(application.interview.date).format('DD/MM/YYYY')}</td>
                    <td>
                      <Tooltip title='Mark as Passed!' placement='top'>
                        <span>
                          <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 3} onClick={() => handleShowStatus(application._id, '2')}>
                            <i className='fa fa-check-double text-success mr-4' onClick={() => handleShowStatus(application._id, '2')}/>
                          </button>
                        </span>
                      </Tooltip>
                      <Tooltip title='Mark as failed' placement='top' >
                        <span>
                          <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 3} onClick={() => handleShowStatus(application._id, '3')}>
                            <i className='fa fa-times-circle text-danger' />
                          </button>
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                ))
            }
            </tbody>
          </Table>
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Candidates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-success btn-sm' onClick={handleSelectCandidate}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStatus} onHide={handleCloseStatus} centered>
        <Modal.Header closeButton>
          <Modal.Title>Interview Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleCloseStatus}>
            Close
          </button>
          <button className='btn btn-success btn-sm' onClick={handleChangeStatus}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ jobs: {jobsList} }) => ({
  jobsList
});

export default connect(mapStateToProps, job.actions)(Interviews);