import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setToken } from "../../store/authSlice";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((store)=>store.auth.user)

  console.log(data)

  const handleLogin = (evt) => {
    evt.preventDefault()

    if (email === "" || password === "") {
        setError("Please fill both fields");

      }else{
        setError("");
          axios
            .post("http://127.0.0.1:8000/api/login",{
              email:email,
              password:password
            })
            .then((response) => (
              dispatch(setToken({'token':response.data.token})),
              console.log(response),
              navigate('/movie-list')
            ))
            .catch((error) => (
              setError(error.response.data.error),
              console.log(error)));
      }
    
  };

  return (
    <div id="loginbody">
      <div className="container">
        <div className="row">
          <div
            className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5"
            id="loginCard"
          >
            <div className="card py-3" id="loginInnerCard">
              <div className="card-body">
                <h1 className="text-center text-white">Login</h1>
                { error ? <div className="alert text-center text-white mt-3" style={{background:'rgba(229,9,20,0.7)'}}>{error}</div>:''}
                <form method="post">
                  <label className="text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    className="form-control form-control-sm mb-4 text-white"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                  <label className="text-white" htmlFor="passowrd">
                    Password
                  </label>
                  <input
                    className="form-control form-control-sm mb-4 text-white"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                  <button
                    className="btn btn-primary btn-block mb-2"
                    id="loginBtn"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </form>
                <div className="text-center">
                  <Link className="card-link" to={"/forgot-password"}>
                    Forgot passoword
                  </Link>
                </div>
              </div>
              <div className="card-footer">
                <div className="text-center">
                  <h6 className="text-white">
                    Don't have an account?
                    <Link
                      className="card-link ml-2 font-weight-bold"
                      to={"/signup"}
                    >
                      Signup
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
