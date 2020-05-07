export const editProfileValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required!'
  }

  if (!values.lastName) {
    errors.lastName = 'Required!'
  }
  if (!values.address) {
    errors.address = 'Required!'
  }
  if (!values.country) {
    errors.country = 'Required!'
  }
  if (!values.cv) {
    errors.cv = 'Required!'
  }

  return errors;
}