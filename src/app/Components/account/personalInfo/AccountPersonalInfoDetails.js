import React, {useState} from 'react';
import {connect} from "react-redux";

const AccountPersonalInfoDetails = ({user}) => {
  const [img, setImg] = useState(null)
  const handleChangeProfile = event => {
    setImg(URL.createObjectURL(event.target.files[0]))
  }
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
                  <img src={img ? img : "/media/users/100_13.jpg"} alt="" className="kt-avatar__holder"/>
                  <label className="kt-avatar__upload">
                    <i className="fa fa-pen" />
                    <input type="file" name="profile_avatar" accept="image/*" onChange={handleChangeProfile}/>
                  </label>
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
                <h5>{user.lastName}</h5>
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