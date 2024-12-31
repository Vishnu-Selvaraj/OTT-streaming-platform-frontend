import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from "../search/Search";
import { IoArrowBackOutline } from "react-icons/io5";
import SubscriptionCard from '../subscription_card/SubscriptionCard';
import "./subscriptionplanpage.css";

const SubscriptionPlanPage = () => {
  
  const token = useSelector((store)=>store.auth.user)
  const [allSubscriptionPlans,setAllSubscriptionPlans] = useState([])
  const [filteredSubscriptionPlans,setFilteredSubscriptionPlans] = useState([])


  useEffect(()=>{

    if (token){
      var options = {
        headers:{
          'Authorization':`Token ${token.token}`
        }
      }
    }
    axios.get('http://127.0.0.1:8000/api/get-subscription-plans',options)
    .then((response)=>{
      console.log(response);
      
      setAllSubscriptionPlans(response.data.data)
      setFilteredSubscriptionPlans(response.data.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[token])

  const handleSubscriptionSearch = (searchTerm)=>{
    if (searchTerm.trim() === ''){
      setFilteredSubscriptionPlans(allSubscriptionPlans)
    }else{
      var filteredSubscription = allSubscriptionPlans.filter((plans)=>plans.plan_name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredSubscriptionPlans(filteredSubscription)
    }
  }

      return (
        <div id="SubscribePlanBody">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
              <h2 className='mx-5 mt-3'><Link to={'/movie-list'}><IoArrowBackOutline id='SubscriptionPlanbackicon' /></Link></h2>
                <h1 className="text-white text-center my-3">Subscription Plans</h1>
              </div>
            </div>
            <div className="row" id='SubSearch'>
              <div className="col-12 mx-3 mx-sm-5 mx-md-4 mx-lg-5 my-2">
                <Search subscriptionPlanSearchFunc = {handleSubscriptionSearch} SubscriptionPageSearchCall = {true} /> {/*SubscriptionPageSearchCall is to make decision for the handlesearch function in search component, where to pass the search term */}
              </div>
            </div>

                <div className="row">
                    <div className="col">
                        <SubscriptionCard plans ={filteredSubscriptionPlans} subBtn={true} isSubscriptionPageData = {true}/>
                    </div>
                </div>

          </div>
        </div>
      );
}

export default SubscriptionPlanPage;