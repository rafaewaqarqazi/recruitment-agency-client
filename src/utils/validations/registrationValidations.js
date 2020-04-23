export const validateRegistration = (values, current) => {
  const errors = {};
  if (current === 0 && values.firstName.trim() === '') {
    errors.firstName = 'First Name is Required!'
  }
  if (current === 0 && values.lastName.trim() === '') {
    errors.lastName = 'Last Name is Required!'
  }
  if (current === 0 && values.role.trim() === '') {
    errors.role = 'Role is Required!'
  }
  if (current === 1 && values.email.trim() === '') {
    errors.email = 'Email is required!';
  } else if (current === 1 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid Email!';
  }

  if (current === 1 && values.password.trim() === '') {
    errors.password = 'Password is Required!';
  } else if (current === 1 && !values.password.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    errors.password = 'Invalid Password'
  }
  if (current === 1 && !values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is Required!'
  } else if (current === 1 && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password Does not Match'
  }
  if (current === 2 && !values.agree) {
    errors.agree = 'Please Agree to our privacy and service policy'
  }
  return errors;
}