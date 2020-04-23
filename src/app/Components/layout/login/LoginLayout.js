import React from 'react';

const LoginLayout = ({children, heading}) => {
  return (
    <div
      className="kt-login__body"
      style={{ backgroundImage: "url(/media/bg/bg-3.jpg)", height: '100vh' }}
    >
      <div className="kt-login__form">
        <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
          <div
            className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin"
            id="kt_login"
          >
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
              <div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                <div className="kt-login__container">
                  <div className="kt-login__logo m-0">
                    <img src="/media/logos/suits-logo.png" width="200"/>
                  </div>
                  <div className="kt-login__signin">
                    <div className="kt-login__head">
                      <h3 className="kt-login__title">{heading}</h3>
                    </div>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;