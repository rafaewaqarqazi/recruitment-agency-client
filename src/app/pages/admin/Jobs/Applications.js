import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Link, useHistory} from "react-router-dom";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from "moment";
import {Tooltip} from "@material-ui/core";
import {deleteJob} from "../../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getShortListedInterviews, getShortListedTest} from "../../../../utils";
import PaginationComponent from "../../../Components/PaginationComponent";

const Applications = ({jobsList}) => {
  const history = useHistory()
  const path = history.location.pathname.split('/')[1]
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
  return (
    <div>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Job Applications'
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
              <th>Applications</th>
              {
                (path === 'tests' || path === 'interviews') &&
                  <th>Tests</th>
              }
              {
                path === 'interviews' &&
                  <th>Interviews</th>
              }
            </tr>
            </thead>
            <tbody>
            {
              jobsList.length === 0
                ? <tr >
                  <td colSpan={path === 'tests' ? 9 : path === 'interviews' ? 10 : 8} style={{textAlign: 'center'}}>No Jobs Found</td>
                </tr>
                : jobsInPage.map((job, i) => (
                  <Tooltip title='Click to view Applications' placement='top' key={i}>
                    <tr key={i} onClick={() => history.push(`/${path}/${job._id}`)} className='application-table__row'>
                      <td>{i+1}</td>
                      <td>{job.title}</td>
                      <td>{departments.filter(d => d.code === job.department)[0].title}</td>
                      <td>{categories.filter(c => c.code === job.category)[0].title}</td>
                      <td>{types.filter(t => t.code === job.type)[0].title}</td>
                      <td>{moment(job.postedOn).format('DD/MM/YYYY')}</td>
                      <td>{moment(job.dueDate).format('DD/MM/YYYY')}</td>
                      <td>{job.applications.length}</td>
                      {
                        (path === 'tests' || path === 'interviews') &&
                          <td>{getShortListedTest(job.applications)}</td>
                      }
                      {
                        path === 'interviews' &&
                          <td>{getShortListedInterviews(job.applications)}</td>
                      }
                    </tr>
                  </Tooltip>
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
    </div>
  );
};
const mapStateToProps = ({ jobs: {jobsList} }) => ({
  jobsList
});

export default connect(mapStateToProps)(Applications);