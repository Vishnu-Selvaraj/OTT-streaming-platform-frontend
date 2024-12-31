import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./subscriptionstatus.css";
import SubscriptionCard from "../subscription_card/SubscriptionCard";
import { Link } from "react-router-dom";

const SubscriptionStatus = () => {

  const token = useSelector((store)=>store.auth.user)
  const [currentSubscriptionPlans,setCurrentSubscriptionPlans] = useState([])
  const [currentSubscriptionPlansDate,setCurrentSubscriptionPlansDate] = useState([])
  const [prevSubscriptionPlans,setPrevSubscriptionPlans] = useState([])
  const [prevSubscriptionPlansDate,setPrevSubscriptionPlansDate] = useState([])

  const [errorMessage,setErrorMessage] = useState('')
  const [prevErrorMessage,setPrevErrorMessage] = useState('')


  useEffect(()=>{
    if(token){

      var options = {
        headers:{
          'Authorization':`Token ${token.token}`
        }
      }

      // Current plan list api call

      axios.get('http://127.0.0.1:8000/api/user-current-subscription-plan',options)
      .then((response)=>{
        setCurrentSubscriptionPlans(response.data.data)
        setCurrentSubscriptionPlansDate(response.data.date_of_taken)
        console.log(response)
      })
      .catch((error)=>{
        setErrorMessage(error.response.data.error)
        console.log(error)
      })

      // Previous plan list api call
      
      axios.get('http://127.0.0.1:8000/api/user-previous-subscription-plans',options)
      .then((response)=>{
        setPrevSubscriptionPlans(response.data.data)
        setPrevSubscriptionPlansDate(response.data.date_of_taken)
        console.log(response)
      })
      .catch((error)=>{
        setPrevErrorMessage(error.response.data.error)
        console.log(error)
      })

    }
  },[token])

  console.log(prevSubscriptionPlans)
  return (
    <div id="statusBody">
      <div className="container-fluid">
        <div className="row">
          <div className="col mt-3">
            <h1 className="text-center text-white">Subscription Status</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 my-4">
            <h3 className="text-primary text-center">Current Subscription</h3>
            <SubscriptionCard plans={currentSubscriptionPlans} planTakenDate = {currentSubscriptionPlansDate} currentPlanErrorMessage = {errorMessage} />
          </div>
          <div className="col-12 text-center">
            <Link className="btn btn-outline-danger" to={'/movie-list'} style={{borderRadius:'8px',padding:'5px 70px'}}>Back</Link>
          </div>
        </div>
        <hr style={{backgroundColor:'#aaa'}} />
        <div className="row">
          <div className="col my-4">
            <h1 className="text-center text-white">Payment History</h1>
          </div>
        </div>

        <div className="row">
            <div className="col">
                <h3 className="text-danger text-center">Previous Subscriptions</h3>
                <SubscriptionCard plans={prevSubscriptionPlans} planTakenDate ={prevSubscriptionPlansDate} PrevPlanErrorMessage = {prevErrorMessage} />
            </div>
        </div>


      </div>
    </div>
  );
};

export default SubscriptionStatus;
