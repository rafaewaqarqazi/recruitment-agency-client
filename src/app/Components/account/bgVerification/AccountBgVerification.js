import React from 'react';
import AccountContentHeader from "../AccountContentHeader";
import AccountBgVerificationDetails from "./AccountBgVerificationDetails";

const AccountBgVerification = () => {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='Background Verification' subtitle='verify your account'/>
      <AccountBgVerificationDetails/>
    </div>
  );
};

export default AccountBgVerification;