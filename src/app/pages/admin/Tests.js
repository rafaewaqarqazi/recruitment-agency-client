import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {useHistory, useParams} from "react-router-dom";
import {scheduleTestInterview, changeTestInterviewStatus} from "../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getTestInterviewStatus} from "../../../utils";
import {Tooltip} from "@material-ui/core";
import moment from "moment";
import PaginationComponent from "../../Components/PaginationComponent";

const Tests = ({jobsList, jobEdit, isAdmin}) => {
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
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [applicationsInPage, setApplicationsInPage] = useState([])
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
    getPageData(applications, pageNumber, perPage)
  };
  const getPageData = (data, pageNumber, perPageN) => {
    setApplicationsInPage(data.slice((pageNumber - 1) * perPageN, ((pageNumber - 1) * perPageN) + perPageN <= data.length ? ((pageNumber - 1) * perPageN) + perPageN : data.length))
  }
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    getPageData(applications, pageNo, newPerPage)
  };
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
      const dataN = data[0].applications.filter(app => app.test).map(app => ({...app, checked: false}))
      setApplications(dataN)
      getPageData(dataN, pageNo, perPage)
    }
  }, [jobsList])
  const onCheckAll = () => {
    setApplicationsInPage(applicationsInPage.map(application => {
      return {...application, checked: application.status === '2' && application.test.status === '2' ? !selectAll : false}
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
    setApplicationsInPage(applicationsInPage.map(application => {
      if (application._id === id) {
        return {...application, checked: !application.checked}
      } else {
        return application
      }
    }))
  }
  const handleScheduleInterview = () => {
    const applicationsIds = applicationsInPage.filter(application => application.checked)
      .map(app => app._id)
    scheduleTestInterview({applicationsIds, jobId: job._id, date, status: '3', type: 'interview'})
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
  const handleChangeStatus = () => {
    changeTestInterviewStatus({jobId: job._id, type: 'test', ...statusData})
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
              {
                isAdmin &&
                  <button className='btn btn-label btn-bold btn-sm' onClick={handleShow} disabled={applicationsInPage.filter(app => app.checked).length === 0}>
                    <i className='fa fa-clock'/> Schedule Interview
                  </button>
              }
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <Table responsive>
            <thead>
            <tr>
              {
                isAdmin &&
                  <th>
                    <input
                      type="checkbox"
                      className='form-check'
                      disabled={applicationsInPage.filter(app => app.test.status === '2').length === 0}
                      checked={selectAll}
                      onChange={onCheckAll}
                    />
                  </th>
              }
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>CV</th>
              <th>Test Status</th>
              <th>Test Date</th>
              {
                isAdmin &&
                  <th>Actions</th>
              }
            </tr>
            </thead>
            <tbody>
            {
              applicationsInPage.length === 0
                ? <tr >
                  <td colSpan={isAdmin ? 8 : 6} style={{textAlign: 'center'}}>No Tests Found</td>
                </tr>
                : applicationsInPage.map((application, i) => (
                  <tr key={i}>
                    {
                      isAdmin &&
                        <td>
                          <input
                            type="checkbox"
                            className='form-check'
                            disabled={application.test.status !== '2' || application.status === '3'}
                            checked={application.checked}
                            onChange={() => onCheckSingle(application._id)}
                          />
                        </td>
                    }
                    <td>{application.user.firstName}</td>
                    <td>{application.user.lastName}</td>
                    <td>{application.user.email}</td>
                    <td>{application.user.cv ? application.cv.filename : 'Not Provided'}</td>
                    <td>{getTestInterviewStatus(application.test.status)}</td>
                    <td>{moment(application.test.date).format('DD/MM/YYYY')}</td>
                    {
                      isAdmin &&
                        <td>
                          <Tooltip title='Mark as Passed!' placement='top'>
                          <span>
                            <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 2} onClick={() => handleShowStatus(application._id, '2')}>
                              <i className='fa fa-check-double text-success mr-4' onClick={() => handleShowStatus(application._id, '2')}/>
                            </button>
                          </span>
                          </Tooltip>
                          <Tooltip title='Mark as failed' placement='top' >
                          <span>
                            <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 2} onClick={() => handleShowStatus(application._id, '3')}>
                              <i className='fa fa-times-circle text-danger' />
                            </button>
                          </span>
                          </Tooltip>
                        </td>
                    }
                  </tr>
                ))
            }
            </tbody>
          </Table>
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={applications.length}
          />
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="input-group">
              <DateTimePicker
                animateYearScrolling
                disablePast
                className='form-control date-picker'
                value={date}
                onChange={handleChangeDate}
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
          <button className='btn btn-success btn-sm' onClick={handleScheduleInterview}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStatus} onHide={handleCloseStatus} centered>
        <Modal.Header closeButton>
          <Modal.Title>Test Status</Modal.Title>
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
const mapStateToProps = ({ jobs: {jobsList}, auth }) => ({
  jobsList,
  isAdmin: auth.user && auth.user.role === '2'
});

export default connect(mapStateToProps, job.actions)(Tests);