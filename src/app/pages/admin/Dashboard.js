import React, {useState} from "react";
import {useSelector} from "react-redux";
import JobCard from "../../Components/jobs/JobCard";
import {Alert} from "react-bootstrap";

export default function Dashboard() {
  const { jobsList } = useSelector(
    ({ jobs: {jobsList} }) => ({
      jobsList
    })
  );
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  return (
    <>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <div className='row'>
        {
          jobsList.map(job => (
            <div className="col-12 col-sm-4" key={job._id}>
              <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
            </div>
          ))
        }
      </div>
    </>
  );
}
