import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Modal, Table, Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from 'moment'
import {Tooltip} from "@material-ui/core";
import {deleteJob} from "../../../crud/job.crud";
import * as job from "../../../store/ducks/jobs.duck";
import PaginationComponent from "../../../Components/PaginationComponent";

const Jobs = ({jobsList, removeJob}) => {
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState('');
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [jobsInPage, setJobsInPage] = useState([])
  useEffect(() => {
    getPageData()
  }, [])
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
    getPageData()
  };
  const getPageData = () => {
   setJobsInPage(jobsList.slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= jobsList.length ? ((pageNo - 1) * perPage) + perPage : jobsList.length))
  }
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    getPageData()
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setJobId(id)
    setShow(true);
  }
  const confirmDelete = () => {
    deleteJob(jobId)
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleClose()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleClose()
          removeJob(jobId)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not delete Job Post'})
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
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Jobs'
          toolbar={
            <PortletHeaderToolbar>
              <Link to='/jobs/new'>
                <button className='btn btn-label btn-bold btn-sm'>
                  <i className='fa fa-plus'/> New Job Post
                </button>
              </Link>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <Table responsive>
            <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Department</th>
              <th>Category</th>
              <th>Type</th>
              <th>Posted On</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              jobsList.length === 0
                ? <tr >
                  <td colSpan={8} style={{textAlign: 'center'}}>No Jobs Found</td>
                </tr>
                : jobsInPage.map((job, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{job.title}</td>
                  <td>{departments.filter(d => d.code === job.department)[0].title}</td>
                  <td>{categories.filter(c => c.code === job.category)[0].title}</td>
                  <td>{types.filter(t => t.code === job.type)[0].title}</td>
                  <td>{moment(job.postedOn).format('DD/MM/YYYY')}</td>
                  <td>{moment(job.dueDate).format('DD/MM/YYYY')}</td>
                  <td>
                    <Tooltip title='Edit Post' placement='top'>
                      <Link to={`/jobs/edit/${job._id}`}>
                        <i className='fa fa-pencil-alt mr-4'/>
                      </Link>
                    </Tooltip>
                    <Tooltip title='Delete Post' placement='top'>
                      <i className='fa fa-minus-circle' style={{color: 'red'}} onClick={() => handleShow(job._id)}/>
                    </Tooltip>
                  </td>
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
            total={jobsList.length}
          />
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job post?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-danger btn-sm' onClick={confirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ jobs: {jobsList} }) => ({
  jobsList
});

export default connect(mapStateToProps, job.actions)(Jobs);