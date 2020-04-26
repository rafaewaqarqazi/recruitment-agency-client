import React from 'react';
import {Portlet, PortletBody} from "../../../partials/content/Portlet";
import {Table} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from 'moment'
const Jobs = ({jobsList}) => {
  return (
    <div>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletBody>
          <div className='d-flex justify-content-end'>
            <Link to='/jobs/new'>
              <button className='btn btn-label btn-bold btn-sm'>
                <i className='fa fa-plus'/> New Post
              </button>
            </Link>
          </div>
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
            </tr>
            </thead>
            <tbody>
            {
              jobsList.map((job, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{job.title}</td>
                  <td>{departments.filter(d => d.code === job.department)[0].title}</td>
                  <td>{categories.filter(c => c.code === job.category)[0].title}</td>
                  <td>{types.filter(t => t.code === job.type)[0].title}</td>
                  <td>{moment(job.postedOn).format('DD/MM/YYYY')}</td>
                  <td>{moment(job.dueDate).format('DD/MM/YYYY')}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
        </PortletBody>
      </Portlet>
    </div>
  );
};
const mapStateToProps = ({ jobs: {jobsList} }) => ({
  jobsList
});

export default connect(mapStateToProps)(Jobs);