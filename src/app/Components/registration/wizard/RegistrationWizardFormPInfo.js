import React from "react";
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormPInfo = ({errors}) => {
  return (
    <RegistrationWizardContent title="Setup Your Personal Information">
      <div className="form-group">
        <label>First Name*</label>
        {formErrorMessage(errors.firstName)}
        <Field className="form-control" name="firstName" placeholder="First Name" required/>
        <span className="form-text text-muted">Please enter your First Name</span>

      </div>
      <div className="form-group">
        <label>Last Name*</label>
        {formErrorMessage(errors.lastName)}
        <Field className="form-control" name="lastName" placeholder="Last Name" required/>
        <span className="form-text text-muted">Please enter your Last Name</span>
      </div><div className="form-group">
        <label>Register As</label>
        {formErrorMessage(errors.role)}
        <Field className="form-control" name="role" as='select'>
          <option value="">Select Role</option>
          <option value="1">Client</option>
          <option value="2">Lawyer</option>
        </Field>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormPInfo;
