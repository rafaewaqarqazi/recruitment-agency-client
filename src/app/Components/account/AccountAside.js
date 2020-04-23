import React from "react";
import { connect } from "react-redux";

const AccountAside = ({ selected, setSelected, user }) => {
  return (
    <div className="kt-grid__item kt-app__toggle kt-app__aside">
      <div className="kt-portlet ">
        <div className="kt-portlet__body kt-portlet__body--fit-y">
          <div className="kt-widget kt-widget--user-profile-1">
            <div className="kt-widget__head">
              <div className="kt-widget__media">
                <img src="/media/users/100_13.jpg" alt="image" />
              </div>
              <div className="kt-widget__content">
                <div className="kt-widget__section">
                  <span className="kt-widget__username">
                    {`${user.firstName} ${user.surName}`}
                    <i className="flaticon2-correct kt-font-success" />
                  </span>
                </div>
              </div>
            </div>
            <div className="kt-widget__body">
              <div className="kt-widget__content">
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Email:</span>
                  <span className="kt-widget__data">{user.email}</span>
                </div>
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Phone:</span>
                  <span className="kt-widget__data">{user.mobileNo}</span>
                </div>
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Location:</span>
                  <span className="kt-widget__data">{user.country}</span>
                </div>
              </div>
              <div className="kt-widget__items">
                <span
                  onClick={() => setSelected(0)}
                  className={`kt-widget__item ${selected === 0 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <polygon points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                            fill="#000000"
                            fillRule="nonzero"
                            opacity="0.3"
                          />
                          <path
                            d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                            fill="#000000"
                            fillRule="nonzero"
                          />
                        </g>
                      </svg>{" "}
                    </span>
                    <span className="kt-widget__desc">
                      Personal Information
                    </span>
                  </span>
                </span>
                <span
                  onClick={() => setSelected(1)}
                  className={`kt-widget__item ${selected === 1 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle
                            fill="#000000"
                            opacity="0.3"
                            cx="12"
                            cy="12"
                            r="10"
                          />
                          <path
                            d="M14.5,11 C15.0522847,11 15.5,11.4477153 15.5,12 L15.5,15 C15.5,15.5522847 15.0522847,16 14.5,16 L9.5,16 C8.94771525,16 8.5,15.5522847 8.5,15 L8.5,12 C8.5,11.4477153 8.94771525,11 9.5,11 L9.5,10.5 C9.5,9.11928813 10.6192881,8 12,8 C13.3807119,8 14.5,9.11928813 14.5,10.5 L14.5,11 Z M12,9 C11.1715729,9 10.5,9.67157288 10.5,10.5 L10.5,11 L13.5,11 L13.5,10.5 C13.5,9.67157288 12.8284271,9 12,9 Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>{" "}
                    </span>
                    <span className="kt-widget__desc">Change Password</span>
                  </span>
                </span>
                <span
                  onClick={() => setSelected(2)}
                  className={`kt-widget__item ${selected === 2 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z"
                            fill="#000000"
                            opacity="0.3"
                          />
                          <path
                            d="M11.1750002,14.75 C10.9354169,14.75 10.6958335,14.6541667 10.5041669,14.4625 L8.58750019,12.5458333 C8.20416686,12.1625 8.20416686,11.5875 8.58750019,11.2041667 C8.97083352,10.8208333 9.59375019,10.8208333 9.92916686,11.2041667 L11.1750002,12.45 L14.3375002,9.2875 C14.7208335,8.90416667 15.2958335,8.90416667 15.6791669,9.2875 C16.0625002,9.67083333 16.0625002,10.2458333 15.6791669,10.6291667 L11.8458335,14.4625 C11.6541669,14.6541667 11.4145835,14.75 11.1750002,14.75 Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="kt-widget__desc">
                      Google 2fa Verification
                    </span>
                  </span>
                </span>
                <span
                  onClick={() => setSelected(3)}
                  className={`kt-widget__item ${selected === 3 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z"
                            fill="#000000"
                            opacity="0.3"
                          />
                          <path
                            d="M10.875,16.75 C10.6354167,16.75 10.3958333,16.6541667 10.2041667,16.4625 L8.2875,14.5458333 C7.90416667,14.1625 7.90416667,13.5875 8.2875,13.2041667 C8.67083333,12.8208333 9.29375,12.8208333 9.62916667,13.2041667 L10.875,14.45 L14.0375,11.2875 C14.4208333,10.9041667 14.9958333,10.9041667 15.3791667,11.2875 C15.7625,11.6708333 15.7625,12.2458333 15.3791667,12.6291667 L11.5458333,16.4625 C11.3541667,16.6541667 11.1145833,16.75 10.875,16.75 Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="kt-widget__desc">
                      Background Verification
                    </span>
                  </span>
                </span>
                <span
                  onClick={() => setSelected(4)}
                  className={`kt-widget__item ${selected === 4 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <path
                            d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M19.0710678,4.92893219 L19.0710678,4.92893219 C19.4615921,5.31945648 19.4615921,5.95262146 19.0710678,6.34314575 L6.34314575,19.0710678 C5.95262146,19.4615921 5.31945648,19.4615921 4.92893219,19.0710678 L4.92893219,19.0710678 C4.5384079,18.6805435 4.5384079,18.0473785 4.92893219,17.6568542 L17.6568542,4.92893219 C18.0473785,4.5384079 18.6805435,4.5384079 19.0710678,4.92893219 Z"
                            fill="#000000"
                            fillRule="nonzero"
                            opacity="0.3"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="kt-widget__desc">Deactivate Account</span>
                  </span>
                </span>
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
export default connect(mapStateToProps)(AccountAside);
