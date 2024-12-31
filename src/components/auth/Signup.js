import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const Signup = () => {

  const [name,setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const handleSignup = (evt)=>{
    evt.preventDefault()
    if (name === ''||email === ''||password === ''||passwordConf === ''){
      setError('Please fill in all fields.')
    }else if(password !== passwordConf){
      setError('Passwords do not match.Please try again.')
    }else if(!(pattern.test(password))){
      setError('Password is too weak.Password must be at least 8 characters long with at least one capital letter and symbol')
    }else{
      axios.post('http://127.0.0.1:8000/api/signup',{
        name:name,
        email:email,
        password:password
      })
      .then((response)=>(
        navigate('/login')
      ))
      .catch((error)=>(
        setError(error.response.data.error)
      ))
    }
  }


  return (
    <div id="Signupbody">
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-sm-11 col-md-8 col-lg-7 col-xl-5"
            id="card"
          >
            <div className="card" id="innerCard">
              <div className="card-body" id="signupBody">
                <h1 className="text-center mb-3 text-white">Sign up</h1>
                { error ? <div className="alert text-center text-white mt-3" style={{background:'rgba(229,9,20,0.7)'}}>{error}</div>:''}
                <form id="signupForm" method="post" className="form-group">
                  <label className="text-white" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-sm mb-3 text-white"
                    placeholder="Enter your name"
                    autoComplete="off"
                    value={name}
                    onInput={(evt)=> setName(evt.target.value)}
                  />
                  <label className="text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-sm mb-3 text-white"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onInput={(evt)=> setEmail(evt.target.value)}
                  />
                  <label className="text-white" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-sm mb-3 text-white"
                    placeholder="Enter your password"
                    autoComplete="off"
                    value={password}
                    onInput={(evt)=> setPassword(evt.target.value)}
                  />
                  <label className="text-white" htmlFor="passwordConf">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="passwordConf"
                    className="form-control form-control-sm mb-3 text-white"
                    placeholder="Confirm you password"
                    autoComplete="off"
                    value={passwordConf}
                    onInput={(evt)=> setPasswordConf(evt.target.value)}
                  />
                  <button id="signupBtn" className="btn btn-primary btn-block" onClick={handleSignup}>
                    Signup
                  </button>
                </form>
                <div className="text-center">
                  <h6 className="text-white">
                    Already have an Account?
                    <Link
                      id="loginLink"
                      to={"/login"}
                      className="card-link font-weight-bold p-2"
                    >
                      Login
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
};

export default Signup;
