import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$#!%*?&]{8,}$/;

  var token = useSelector((store) => store.auth.user.token);

  var options = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const handleChangePassword = (evt) => {
    evt.preventDefault();
    if (currentPassword === "" || password === "" || passwordConf === "") {
      setError("Please fill in all fields.");
    } else if (password !== passwordConf) {
      setError("Passwords do not match.Please try again.");
    } else if (!pattern.test(password)) {
      setError(
        "Password is too weak.Password must be at least 8 characters long with at least one capital letter and symbol"
      );
    } else {
      setError("");
      axios.post("http://127.0.0.1:8000/api/change_password",
          {
            old_password: currentPassword,
            new_password: password,
          },
          options
        )
        .then(
          (response) => (alert(response.data.message), navigate("/movie-list"))
        )
        .catch((error) =>
          setError(
            error.response.data.error || "An error occurred. Please try again."
          )
        );
    }
  };

  return (
    <div id="changePasswordbody">
      <div className="container">
        <div className="row">
          <div
            className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5"
            id="loginCard"
          >
            <div className="card py-3 text-white" id="changePasswordInnerCard">
              <div className="card-body">
                <h1 className="text-center mb-4">Change Password</h1>
                {error ? (
                  <div
                    className="alert text-center text-white mt-3"
                    style={{ background: "rgba(229,9,20,0.7)" }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}
                <form method="post">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    className="form-control form-control-sm mb-4 text-white"
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter your Current password"
                    autoComplete="off"
                    value={currentPassword}
                    onInput={(evt) => setCurrentPassword(evt.target.value)}
                  />
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="form-control form-control-sm mb-4 text-white"
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="off"
                    value={password}
                    onInput={(evt) => setPassword(evt.target.value)}
                  />
                  <label htmlFor="passwordConf">Confirm Password</label>
                  <input
                    className="form-control form-control-sm mb-4 text-white"
                    type="password"
                    name="passwordConf"
                    id="passwordConf"
                    placeholder="Confirm your new password"
                    autoComplete="off"
                    value={passwordConf}
                    onInput={(evt) => setPasswordConf(evt.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="btn btn-primary btn-block mb-3 text-white"
                      id="changePassword"
                      onClick={handleChangePassword}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
