import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PaginationComponent from "../../Components/PaginationComponent";
import JobCard from "../../Components/jobs/JobCard";
import {Alert} from "react-bootstrap";

const JobsApplied = () => {
  const { jobsList, userId } = useSelector(
    ({ jobs: {jobsList}, auth }) => ({
      jobsList,
      userId: auth.user && auth.user._id,
    })
  );
  const [userJobs, setUserJobs] = useState([])
  useEffect(() => {
    setUserJobs(jobsList.filter(job => job.applications.filter(app => app.user._id === userId).length > 0))
  }, [])
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  return (
    <div className='pb-5'>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <div className='row'>
        {
          userJobs
            .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= jobsList.length ? ((pageNo - 1) * perPage) + perPage : jobsList.length)
            .map(job => (
              <div className="col-12 col-sm-4" key={job._id}>
                <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
              </div>
            ))
        }

      </div>
      <PaginationComponent
        pageNo={pageNo}
        perPage={perPage}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        total={userJobs.length}
      />
    </div>
  );
};

export default JobsApplied;