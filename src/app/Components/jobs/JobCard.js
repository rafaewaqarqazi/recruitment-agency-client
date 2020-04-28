import React from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../partials/content/Portlet";
import {getDepartment, getExperience} from "../../../utils/job-post-data";
import moment from "moment";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const JobCard = ({job}) => {
  const { isUser, userId } = useSelector(
    ({ auth }) => ({
      isUser: auth.user && auth.user.role === '1',
      userId: auth.user && auth.user._id,
    })
  );
  const handleClickApply = () => {
    console.log('id', job._id)
    console.log('userId', userId)
  }
  return (
    <Portlet className=" kt-portlet--border-bottom-brand">
      <PortletHeader
        title={job.title}
      />
      <PortletBody>
        <h5>{getDepartment(job.department)}</h5>
        <div className='pt-2 pb-2'>
          <div className='d-flex justify-content-between'>
            <span className='font-weight-bold'>Experience:</span>
            <span>{getExperience(job.experience)}</span>
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
            // !moment().isAfter(job.dueDate) &&
            <button className='btn btn-success btn-sm ml-3' onClick={handleClickApply}>Apply</button>
          }

        </div>
      </PortletFooter>
    </Portlet>
  );
};

export default JobCard;