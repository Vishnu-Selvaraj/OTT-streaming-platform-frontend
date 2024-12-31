import React,{useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function ResetPassword() {

  const {token} = useParams()
  console.log(token)

  const [newPassword,setNewPassword] = useState('')
  const [newPasswordConf,setNewPasswordConf] = useState('')
  const [error,setError] = useState('')
  const [message,setMessage] = useState('')
  const navigate = useNavigate()
  var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$#!%*?&]{8,}$/

  const handleResetPassword = (evt)=>{
    evt.preventDefault()
    if (newPassword === ''||newPasswordConf === ''){
      setError('Please fill in all fields.')
    }else if(newPassword !== newPasswordConf){
      setError('Passwords do not match.Please try again.')
    }else if(!(pattern.test(newPassword))){
      setError('Password is too weak.Password must be at least 8 characters long with at least one capital letter and symbol')
    }else{
      setError('')
      axios.post('http://127.0.0.1:8000/api/reset-new-password',{
        new_password:newPassword,
        token:token
      })
      .then((response)=>(
        setNewPassword(''),
        setNewPasswordConf(''),
        console.log(response),
        setMessage(response.data.message),
        setTimeout(()=>{
          navigate('/login')
        },2000)
      )
       
      )
      .catch((error)=>{
        console.log(error)
        navigate('/link-expired')
      })
    }
  }


  return (
      <div id="ResetPagebody">
        <div className="container">
          <div className="row">
            <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5" id="loginCard">
              <div className="card py-3 text-white" id="resetInnerCard">
                <div className="card-body">
                  <h1 className="text-center mb-4">Reset Password</h1>
                  { error ? <div className="alert text-center text-white mt-3" style={{background:'rgba(229,9,20,0.7)'}}>{error}</div>:''}
                  { message ? <div className="alert text-center text-white mt-3" style={{background:'rgba(20,164,77,0.7)'}} >{message}</div>:''}
                  <form method="post">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      className="form-control form-control-sm mb-4 text-white"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onInput={((evt)=>setNewPassword(evt.target.value))}
                    />
                    <label htmlFor="passwordConf">Confirm Password</label>
                    <input
                      className="form-control form-control-sm mb-4 text-white"
                      type="password"
                      name="passwordConf"
                      id="passwordConf"
                      placeholder="Confirm your new password"
                      value={newPasswordConf}
                      onInput={(evt)=>(setNewPasswordConf(evt.target.value))}
                    />
                    <div style={{display:'flex',justifyContent:'center'}} >
                    <button
                      className="btn btn-primary btn-block mb-3 text-white"
                      id="resetBtn"
                      onClick={handleResetPassword}
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

export default ResetPassword;
