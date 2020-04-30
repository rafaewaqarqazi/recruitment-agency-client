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

const Applications = ({jobsList}) => {
  const history = useHistory()

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
            </tr>
            </thead>
            <tbody>
            {
              jobsList.length === 0
                ? <tr >
                  <td colSpan={8} style={{textAlign: 'center'}}>No Jobs Found</td>
                </tr>
                : jobsList.map((job, i) => (
                  <Tooltip title='Click to view Applications' placement='top' key={i}>
                    <tr key={i} onClick={() => history.push(`/applications/${job._id}`)} className='application-table__row'>
                      <td>{i+1}</td>
                      <td>{job.title}</td>
                      <td>{departments.filter(d => d.code === job.department)[0].title}</td>
                      <td>{categories.filter(c => c.code === job.category)[0].title}</td>
                      <td>{types.filter(t => t.code === job.type)[0].title}</td>
                      <td>{moment(job.postedOn).format('DD/MM/YYYY')}</td>
                      <td>{moment(job.dueDate).format('DD/MM/YYYY')}</td>
                      <td>{job.applications.length}</td>
                    </tr>
                  </Tooltip>
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

export default connect(mapStateToProps)(Applications);