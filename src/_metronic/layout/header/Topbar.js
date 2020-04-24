import React from "react";
import UserProfile from "../../../app/partials/layout/UserProfile";

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar kt-grid__item">
        <UserProfile />
      </div>
    );
  }
}
