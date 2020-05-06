import React, {useState} from 'react';
import UserLayout from "../Components/layout/user/UserLayout";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {useSelector} from "react-redux";
import JobCard from "../Components/jobs/JobCard";

const Home = () => {
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const { jobsList } = useSelector(
    ({ jobs: {jobsList} }) => ({
      jobsList
    })
  );
  return (
    <UserLayout>
      <div style={{marginTop: '-20px'}}>
        <div className="container">
          <Alert show={success.show} variant="success">{success.message}</Alert>
          <Alert show={error.show} variant="danger">{error.message}</Alert>
          <div className="row align-items-center" style={{height: 400}}>
            <div className="col-12 col-sm-7 text-center pb-3 pb-sm-0">
              <h3>We offer Many Job vacancies Right Now!</h3>
              <h6>Find your desire on in a minute</h6>
              <Link to='/jobs/list' className="btn btn-success mt-4">Explore Now</Link>
            </div>
            <div className="col-12 col-sm-5"><img src='/media/illustrations/working.svg' width={400}/></div>
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Latest Jobs</h4>
            <Link to='/jobs/list' className='nav-link'>See All</Link>
          </div>
          <div className="row mt-3">
            {
              jobsList.length === 0 ? <h5 className='text-center w-100 p-5'>No Record Found!</h5>
              : jobsList.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
                .map((job, i) => (
                  i < 6 &&
                  <div className="col-12 col-sm-4" key={job._id}>
                    <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
                  </div>
                ))
            }
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Most Applied</h4>
            <Link to='/jobs/list' className='nav-link'>See All</Link>
          </div>
          <div className="row mt-3">
            {
              jobsList.length === 0 ? <h5 className='text-center w-100 p-5'>No Record Found!</h5>
              : jobsList.sort((a, b) => b.applications.length - a.applications.length)
                .map((job, i) => (
                  i < 6 &&
                  <div className="col-12 col-sm-4" key={job._id}>
                    <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
                  </div>
                ))
            }
          </div>


        </div>
      </div>
    </UserLayout>
  );
};

export default Home;