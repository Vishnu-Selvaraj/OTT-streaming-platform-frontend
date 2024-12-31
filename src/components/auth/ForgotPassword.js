import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"; 
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [message,setMessage] = useState('')

  const handleForgortPassword = (evt)=>{
    evt.preventDefault()
    if (email === ''){
      setError('Please enter your email address.')
    }else{
      setError('')
      axios.post('http://127.0.0.1:8000/api/reset-password-request',{
        email:email
      })
      .then((response)=>{
        setEmail('')
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "rgba(51, 51, 51, 0.9)",
            fontWeight: "400",
            color: "#fff",
          },
        });
        // setMessage(response.data.message)
        console.log(response)})
      .catch((error)=>{
        setError(error.response.data.error || 'An error occurred. Please try again.')
        console.log(error)
      })

    }
  }
  return (
    <div id="ForgotPagebody">
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto"
            id="forgotcard"
          >
            <div className="card py-3 text-white" id="forgotInnercard">
              <div className="card-body">
                <h2 className="card-title text-center font-weight-bold">
                  Forgot Your password?
                </h2>
                <p className="card-text  text-center font-weight-normal ">
                  Enter your email address to request a password reset link.
                </p>
                { error ? <div className="alert text-center text-white mt-3" style={{background:'rgba(229,9,20,0.7)'}}>{error}</div>:''}
                {/* { message ? <div className="alert text-center text-white mt-3" style={{background:'rgba(20,164,77,0.7)'}} >{message}</div>:''} */}
                <form className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control form-control-sm mb-4 text-white"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onInput = {(evt)=>setEmail(evt.target.value)}
                  />
                  <button
                    className="btn btn-primary btn-block text-white"
                    id="sendLink"
                    onClick={handleForgortPassword}
                  >
                    Send link
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
