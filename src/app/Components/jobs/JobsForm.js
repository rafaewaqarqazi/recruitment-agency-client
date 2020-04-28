import React, {Fragment, useState} from 'react';
import {ErrorMessage, Field} from "formik";
import {formErrorMessage} from "../../pages/errors/FormErrorMessage";
import {categories, departments, experience, qualifications, types} from "../../../utils/job-post-data";
import {Chip} from '@material-ui/core'
import clsx from "clsx";
import { useHistory } from "react-router-dom";
const JobsForm = ({errors, values, setFieldValue, isSubmitting, loading, loadingButtonStyle}) => {
  const history = useHistory();
  const handleChangeQualification = event => {
    const value = [].slice
      .call(event.target.selectedOptions)
      .map(option => option.value)
    setFieldValue('qualifications', [...values.qualifications, ...value])
  }
  const handleDelete = (i) => {
    setFieldValue('qualifications', values.qualifications.filter((v, index) => index !== i))
  }
  return (
    <Fragment>
    <div className="row">
      <div className="form-group col-6">
        <label>Title*</label>
        <ErrorMessage name='title' render={formErrorMessage}/>
        <Field className="form-control" name="title" placeholder="Job Title" />
        <span className="form-text text-muted">Please enter job title</span>
      </div>
      <div className="form-group col-6">
        <label>Department*</label>
        <ErrorMessage name='department' render={formErrorMessage}/>
        <Field className="form-control" name="department" as='select'>
          <option value="">--Select Department--</option>
          {
            departments.map(({code, title}) => (
              <option value={code} key={code}>{title}</option>
            ))
          }
        </Field>
        <span className="form-text text-muted">Please select job department</span>
      </div>
      <div className="form-group col-6">
        <label>Category*</label>
        <ErrorMessage name='category' render={formErrorMessage}/>
        <Field className="form-control" name="category" as='select'>
          <option value="">--Select Category--</option>
          {
            categories.map(({code, title}) => (
              <option value={code} key={code}>{title}</option>
            ))
          }
        </Field>
        <span className="form-text text-muted">Please select job category</span>
      </div>
      <div className="form-group col-6">
        <label>Type*</label>
        <ErrorMessage name='type' render={formErrorMessage}/>
        <Field className="form-control" name="type" as='select'>
          <option value="">--Select Type--</option>
          {
            types.map(({code, title}) => (
              <option value={code} key={code}>{title}</option>
            ))
          }
        </Field>
        <span className="form-text text-muted">Please select job type</span>
      </div>
      <div className="form-group col-12">
        <label>Description*</label>
        <ErrorMessage name='description' render={formErrorMessage}/>
        <Field className="form-control" name="description" as='textarea'/>

        <span className="form-text text-muted">Please provide job description ({values.description.length}/200)</span>
      </div>
      <div className="form-group col-6">
        <label>Due Date*</label>
        <ErrorMessage name='dueDate' render={formErrorMessage}/>
        <div className="input-group">
          <Field as={
            (props) => (
              <input type="text" className="form-control" onFocus={(e) => e.currentTarget.type='date'} onBlur={(e) => e.currentTarget.type='text'}  {...props} />
            )
          } placeholder='Select Date' name='dueDate'/>
          <div className="input-group-append">
              <span className="input-group-text">
                <span className='fa fa-calendar-check'/>
              </span>
          </div>
        </div>
      </div>
      <div className="form-group col-6">
        <label>Experience*</label>
        <ErrorMessage name='experience' render={formErrorMessage}/>
        <Field className="form-control" name="experience" as='select'>
          <option value="">--Select Experience--</option>
          {
            experience.map(({code, title}) => (
              <option value={code} key={code}>{title}</option>
            ))
          }
        </Field>
        <span className="form-text text-muted">Please select experience</span>
      </div>
      <div className="form-group col-6">
        <label>Qualification*</label>
        <ErrorMessage name='qualifications' render={formErrorMessage}/>
        <Field className="form-control" as='select' onChange={handleChangeQualification}>
          <option value="">--Select Qualifications--</option>
          {
            qualifications.map(({code, title}) => (
              <option value={code} key={code}>{title}</option>
            ))
          }
        </Field>
        <span className="form-text text-muted">Please select job type</span>
      </div>
      <div className="form-group col-6">
        <label>No of Positions*</label>
        <ErrorMessage name='positions' render={formErrorMessage}/>
        <Field as={
          (props) => (
            <input type="number" className="form-control" min={0} {...props}/>
          )
        } placeholder='Positions' name='positions'/>
        <span className="form-text text-muted">Please select job type</span>
      </div>
      <div className="form-group col-12">
        {values.qualifications.map((value, i) => (
          <Chip style={{margin: '0 10px 10px 0'}} variant='outlined' size='small' label={qualifications.filter(f => f.code === value)[0].title} onDelete={() => handleDelete(i)} key={i}/>
        ))}
      </div>

    </div>
    <div className=" d-flex flex-row justify-content-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
          {
            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
          }
        )}`}
        style={loadingButtonStyle}
      >
        {history.location.pathname.includes('/jobs/edit') ? 'Save ' : 'Post '} Job
      </button>
    </div>
  </Fragment>
  );
};

export default JobsForm;