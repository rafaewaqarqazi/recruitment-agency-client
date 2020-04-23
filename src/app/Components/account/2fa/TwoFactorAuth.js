import React, {useState} from 'react';
import AccountContentHeader from "../AccountContentHeader";
import InputSwitch from "../../input/InputSwitch";
import {Collapse} from 'reactstrap'
import {setupTFA, verifyCode, enableTFA, disableTFA} from "../../../crud/auth.crud"
import AlertSuccess from "../../alerts/AlertSuccess";
import AlertError from "../../alerts/AlertError";
import {connect} from "react-redux";
const TwoFactorAuth = ({user}) => {
  const [checked, setChecked] = useState(user.multiFactorAuth || false);
  const [dataURL, setDataURL] = useState(null);
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [code, setCode] = useState('');
  const handleChangeCode = event => {
    if (/^[0-9]*$/.test(event.target.value) && code.length < 6) {
      setCode(event.target.value)
    }
  };
  const handleClickVerify = () => {
    if (/^[0-9]{6}$/.test(code)) {
      verifyCode(code)
        .then(res => {
          enableTFA()
            .then((res) => {
              setError({show: false, message: ''})
              setSuccess({show: true, message: res.data.success})
              setCode('')
            })
            .catch(() => {
              setSuccess({show: false, message: ''})
              setError({show: true, message: 'Could not Enable TFA!'})
            })
        })
        .catch((error) => {
          setSuccess({show: false, message: ''})
          setError({show: true, message: 'Could not Verify Your Code!'})
        })
    } else {
      setSuccess({show: false, message: ''})
      setError({show: true, message: 'In-Valid Code'})
    }
  };
  const handleChangeSwitch = event => {
    const check = event.target.checked;
    if (check) {
      setupTFA()
        .then(res => {
          setDataURL(res.data.dataURL);
          setChecked(check)
        })
        .catch((error) => {
          setError({show: true, message: 'Could not enable TFA!'})
        })
    } else {
      if (user.multiFactorAuth) {
        disableTFA()
          .then((res) => {
            setError({show: false, message: ''})
            setSuccess({show: true, message: res.data.success})
            setChecked(check)
          })
          .catch(() => {
            setSuccess({show: false, message: ''})
            setError({show: true, message: 'Could not Disable TFA!'})
          })
      } else {
        setChecked(check)
      }
    }
  }
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='2 Factor Authentication' subtitle='Enable or disable 2 Factor authentication'/>
      <div className="kt-form kt-form--label-right">
        <div className="kt-portlet__body">
          <div className="kt-section kt-section--first">
            <div className="kt-section__body">
              <AlertSuccess show={success.show} message={success.message} handleClose={() => setSuccess({show: false, message: ''})}/>
              <AlertError show={error.show} message={error.message} handleClose={() => setError({show: false, message: ''})}/>
              <div className="row">
                <div className="col-8">
                  <h3 className="kt-section__title kt-section__title-sm">
                    Google Two Factor Authentication
                  </h3>
                </div>
                <div className="col-4">
                  <InputSwitch
                    checked={checked}
                    onChange={handleChangeSwitch}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  <div className='text-body text-justify'>
                    You can further secure your account by using two factor authentication (2FA)
                    Once enabled, you'll need google authenticator or any other 2FA mobile app to get a unique code at the time of login.
                  </div>
                </div>
              </div>
              <Collapse isOpen={checked && Boolean(dataURL)}>
                <div className="row mt-4">
                  <div className="col-9">
                    <h3 className="kt-section__title kt-section__title-sm">
                      To enable, follow the steps:
                    </h3>
                    <ul >
                      <li >Download the authenticator app</li>
                      <li>Scan the QR Code by using the authenticator app</li>
                      <li>The app will give you a code that you enter in the textbox below</li>
                      <li>Now your 2FA is activated and next time you login, you'll need to provide your unique code from the app</li>
                    </ul>
                    <img src={dataURL} alt="tfa-qrcode"/>
                    <div className="row">
                      <div className="col-6 form-group">
                        <input type="text" className='form-control' value={code} onChange={handleChangeCode} placeholder='Security Code'/>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-primary" onClick={handleClickVerify}>Verify</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>

              <div className={`row mt-${checked ? '3' : '4'}`}>
                <div className="col-8">
                  <h3 className="kt-section__title kt-section__title-sm">
                    Download authenticator app for your device:
                  </h3>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Get it on Google Play"
                      src="https://play.google.com/intl/en_gb/badges/images/generic/en_badge_web_generic.png"
                      style={{width: 150}}
                    />
                  </a>
                  <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://linkmaker.itunes.apple.com/en-gb/badge-lrg.svg?releaseDate=2010-09-20&amp;kind=iossoftware&amp;bubble=ios_apps"
                      alt="Download on the App Store"
                    />
                  </a>
                </div>
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
export default connect(mapStateToProps)(TwoFactorAuth);