import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {useHistory, useParams} from "react-router-dom";
import {scheduleTestInterview} from "../../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getStatus} from "../../../../utils";
import PaginationComponent from "../../../Components/PaginationComponent";
import FiltersApplication from "../../../Components/FiltersApplication";

const ApplicationsSingle = ({jobsList, jobEdit}) => {
  const history = useHistory()
  const params = useParams()
  const [show, setShow] = useState(false);
  const [job, setJob] = useState(false);
  const [applications, setApplications] = useState([]);
  const [date, handleChangeDate] = useState(new Date())
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [selectAll, setSelectAll] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  })
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [applicationsInPage, setApplicationsInPage] = useState([])
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  useEffect(() => {
    const data = jobsList.filter(job => job._id === params.jobId)
    if (data.length === 0) {
      history.push('/applications')
    } else {
      setJob(data[0])
      const dataN = data[0].applications.map(app => ({...app, checked: false}))
      setApplications(dataN)
      setFilteredData(dataN.filter(job =>
        job.status.includes(filters.status) && `${job.user.firstName.toLowerCase()} ${job.user.lastName.toLowerCase()}`.includes(filters.search.toLowerCase())
      ))
    }
  }, [jobsList, filters])
  const onCheckAll = () => {
    setFilteredData(filteredData.map(application => {
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
    setFilteredData(filteredData.map(application => {
      if (application._id === id) {
        return {...application, checked: !application.checked}
      } else {
        return application
      }
    }))
  }
  const handleScheduleTest = () => {
    const applicationsIds = filteredData.filter(application => application.checked).map(app => app._id)
    const emails = filteredData.filter(application => application.checked).map(app => app.user.email)
    scheduleTestInterview({applicationsIds, jobId: job._id, date, type: 'test', status: '2', emails})
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
  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
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
              <button className='btn btn-label btn-bold btn-sm' onClick={handleShow} disabled={filteredData.filter(app => app.checked).length === 0}>
                <i className='fa fa-clock'/> Schedule Test
              </button>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <FiltersApplication filters={filters} handleChangeFilters={handleChangeFilters}/>
          <Table responsive className='mt-3'>
            <thead>
            <tr>
              <th><input type="checkbox" className='form-check' checked={selectAll} onChange={onCheckAll}/></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>CV</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {
              filteredData.length === 0
                ? <tr >
                  <td colSpan={5} style={{textAlign: 'center'}}>No Applications Found</td>
                </tr>
                : filteredData
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= filteredData.length ? ((pageNo - 1) * perPage) + perPage : filteredData.length)
                  .map((application, i) => (
                  <tr key={i}>
                    <td><input type="checkbox" className='form-check' disabled={application.status !== '1'} checked={application.checked} onChange={() => onCheckSingle(application._id)}/></td>
                    <td>{application.user.firstName}</td>
                    <td>{application.user.lastName}</td>
                    <td>{application.user.email}</td>
                    <td>{application.user.cv ? application.cv.filename : 'Not Provided'}</td>
                    <td>{getStatus(application.status)}</td>
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
            total={filteredData.length}
          />
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
          <button className='btn btn-success btn-sm' onClick={handleScheduleTest}>
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