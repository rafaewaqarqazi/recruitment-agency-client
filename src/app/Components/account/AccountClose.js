import React, {useState} from 'react';
import AccountContentHeader from "./AccountContentHeader";
import {Alert} from "reactstrap";
import clsx from "clsx";
import {closeAccount} from "../../crud/auth.crud";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
const AccountClose = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [success, setSuccess] = useState({show: false, message: ''});
  const [error, setError] = useState({show: false, message: ''});
  const [errorAlert, setErrorAlert] = useState(true)
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: '1rem'
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: '1rem' });
  };
  const handleCloseAccount = () => {
    enableLoading();
    setTimeout(() => {
      closeAccount({id: user.id})
        .then(res => {
            disableLoading();
            setError({show: false, message: ''});
            setSuccess({show: true, message: res.data.success});
            setTimeout(() => {
              setRedirect(true)
            }, 3000)
        })
        .catch(() => {
          disableLoading();
          setSuccess({show: false, message: ''});
          setError({show: true, message: 'Something went wrong!'})
        });
    }, 1000);
  };
  if (redirect) {
    return <Redirect to="/logout" />
  }
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='Deactivate Account' subtitle='Deactivate your account'/>
      <div className="kt-form kt-form--label-right">
        <div className="kt-portlet__body">
          <div className="kt-section kt-section--first">
            <div className="kt-section__body">
              <Alert className='alert-solid-success' isOpen={success.show}>
                <div className="alert-icon">
                  <i className="fa fa-check-circle" />
                </div>
                <div className='alert-text'>
                  {success.message}
                </div>
                <div className="alert-close">
                  <button
                    type="button"
                    className="close"
                    onClick={() => setSuccess({show: false, message: ''})}
                  >
                    <span aria-hidden="true">
                      <i className="la la-close" />
                    </span>
                  </button>
                </div>
              </Alert>
              <Alert className='alert-solid-danger' isOpen={errorAlert}>
                <div className="alert-icon">
                  <i className="fa fa-exclamation-triangle" />
                </div>
                <div className='alert-text'>
                  {
                    error.show ? error.message :
                      <span>Are you sure?  <br /> You want to deactivate your account?</span>
                  }
                </div>
                <div className="alert-close">
                  {
                    error.show ?
                      <button
                        type="button"
                        className="close"
                        onClick={() => setErrorAlert(false)}
                      >
                        <span aria-hidden="true">
                          <i className="la la-close" />
                        </span>
                      </button>
                      :
                      <button
                        type="button"
                        onClick={handleCloseAccount}
                        className={`btn btn-outline-danger kt-login__btn-primary ${clsx(
                          {
                            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                          }
                        )}`}
                        style={loadingButtonStyle}
                      >
                        Deactivate Account
                      </button>
                  }
                </div>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth: { user } }) => ({
  user
});
export default connect(mapStateToProps)(AccountClose);