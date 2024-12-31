import React from "react";
import { Link } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import './login.css'

const LinkExpired = () => {

  return (
    <div id="LinkExpiredBody">
      <div className="container">
        <div className="row">
          <div className="col text-center" id="LinkExpiredcard">
          <RxCountdownTimer className="text-danger display-2 mb-4" />
            <h1 className="card-title text-white display-4" id="LinkExpiredtext">
              OOPS...!
            </h1>
            <h4 className="mb-3">Link Expired.</h4>
            <h6>Sorry, your password reset link has expired.</h6>
            <h6 className="mb-3">Please visit the <span className="text-info font-weight-bold">Forgot Password Page</span> to receive a new password reset link mail.</h6>
            <Link to={'/login'} id="LinkExpiredBtn" className="btn btn-success">Go Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkExpired;
