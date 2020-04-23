import React from 'react';
import {connect} from "react-redux";

const AccountPersonalInfoDetails = ({user}) => {
  return (
    <div className="kt-form kt-form--label-right">
      <div className="kt-portlet__body">
        <div className="kt-section kt-section--first">
          <div className="kt-section__body">
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Avatar
              </label>
              <div className="col-lg-9 col-xl-6">
                <div className="kt-avatar kt-avatar--outline">
                  <div className="kt-avatar__holder" style={{backgroundImage: "url(/media/users/100_13.jpg)"}}/>
                  <label className="kt-avatar__upload">
                    <i className="fa fa-pen" />
                    <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg"/>
                  </label>
                  <span className="kt-avatar__cancel">
                      <i className="fa fa-times" />
                    </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <div className='form-label'>
                  First Name
                </div>
                <h5>{user.firstName}</h5>
              </div>
              <div className="form-group col-6">
                <div className='form-label'>
                  Sur Name
                </div>
                <h5>{user.surName}</h5>
              </div><div className="form-group col-6">
              <div className='form-label'>
                Date of Birth
              </div>
              <h5>{user.dob}</h5>
            </div>
              <div className="form-group col-6">
                <div className='form-label'>
                  Country
                </div>
                <h5>{user.country}</h5>
              </div>
              <div className="form-group col-6">
                <div className='form-label'>
                  Address
                </div>
                <h5>{user.address}</h5>
              </div>
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
export default connect(mapStateToProps)(AccountPersonalInfoDetails);