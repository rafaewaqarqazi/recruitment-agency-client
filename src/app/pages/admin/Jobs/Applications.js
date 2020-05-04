import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {useHistory} from "react-router-dom";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from "moment";
import {Tooltip} from "@material-ui/core";
import {connect} from "react-redux";
import {getShortListedInterviews, getShortListedTest} from "../../../../utils";
import PaginationComponent from "../../../Components/PaginationComponent";
import Filters from "../../../Components/Filters";

const Applications = ({jobsList}) => {
  const history = useHistory()
  const path = history.location.pathname.split('/')[1]
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [jobs, setJobs] = useState(jobsList.filter(job => job.applications.length > 0))
  const [filteredData, setFilteredData] = useState(jobsList.filter(job => job.applications.length > 0))
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    type: '',
    search: ''
  })
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  useEffect(() => {
    setFilteredData(jobs.filter(job =>
      filters.department !== ''
        ? job.department === filters.department && job.category.includes(filters.category) && job.type.includes(filters.type) && job.title.toLowerCase().includes(filters.search.toLowerCase())
        : job.department.includes(filters.department) && job.category.includes(filters.category) && job.type.includes(filters.type) && job.title.toLowerCase().includes(filters.search.toLowerCase())
    ))
  }, [filters])
  return (
    <div>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Job Applications'
        />
        <PortletBody>
          <Filters filters={filters} handleChangeFilters={handleChangeFilters}/>
          <Table responsive className='mt-3'>
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
              filteredData.length === 0
                ? <tr >
                  <td colSpan={path === 'tests' ? 9 : path === 'interviews' ? 10 : 8} style={{textAlign: 'center'}}>No Jobs Found</td>
                </tr>
                : filteredData
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= filteredData.length ? ((pageNo - 1) * perPage) + perPage : filteredData.length)
                  .map((job, i) => (
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
            total={filteredData.length}
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