import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Link, useHistory, useParams} from "react-router-dom";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from "moment";
import {Tooltip} from "@material-ui/core";
import {scheduleTest} from "../../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const ApplicationsSingle = ({jobsList, jobEdit}) => {
  const history = useHistory()
  const params = useParams()
  const [show, setShow] = useState(false);
  const [job, setJob] = useState(false);
  const [applications, setApplications] = useState([]);
  const [testDate, handleChangeTestDate] = useState(new Date())
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [selectAll, setSelectAll] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }
  useEffect(() => {
    const data = jobsList.filter(job => job._id === params.jobId)
    if (data.length === 0) {
      history.push('/applications')
    } else {
      setJob(data[0])
      setApplications(data[0].applications.map(app => ({...app, checked: false})))
    }
  }, [jobsList])
  const onCheckAll = () => {
    setApplications(applications.map(application => {
      return {...application, checked: application.status === '1' ? !selectAll : false}
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
  const handleScheduleTest = () => {
    const applicationsIds = applications.filter(application => application.checked)
      .map(app => app._id)
    scheduleTest({applicationsIds, jobId: job._id, testDate})
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
        setError({show: true, message: 'Could not Schedule Test'})
        handleClose()
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
                <i className='fa fa-clock'/> Schedule Test
              </button>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <Table responsive>
            <thead>
            <tr>
              <th><input type="checkbox" className='form-check' checked={selectAll} onChange={onCheckAll}/></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>CV</th>
            </tr>
            </thead>
            <tbody>
            {
              applications.length === 0
                ? <tr >
                  <td colSpan={5} style={{textAlign: 'center'}}>No Applications Found</td>
                </tr>
                : applications.map((application, i) => (
                  <Tooltip title='Click to view Applications' placement='top'>
                    <tr key={i}>
                      <td><input type="checkbox" className='form-check' disabled={application.status !== '1'} checked={application.checked} onChange={() => onCheckSingle(application._id)}/></td>
                      <td>{application.user.firstName}</td>
                      <td>{application.user.lastName}</td>
                      <td>{application.user.email}</td>
                      <td>{application.user.cv ? application.cv.filename : 'Not Provided'}</td>
                    </tr>
                  </Tooltip>
                ))
            }
            </tbody>
          </Table>
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="input-group">
              <DateTimePicker
                animateYearScrolling
                disablePast
                className='form-control date-picker'
                value={testDate}
                onChange={handleChangeTestDate}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <span className='fa fa-calendar-check'/>
                </span>
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-danger btn-sm' onClick={handleScheduleTest}>
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

export default connect(mapStateToProps, job.actions)(ApplicationsSingle);