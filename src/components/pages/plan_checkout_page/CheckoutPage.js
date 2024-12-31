import React, { useEffect,useState } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './checkout.css'
import {toast} from 'react-hot-toast'

const CheckoutPage = () => {

    const token = useSelector((store)=>store.auth.user)
    const {planId} = useParams()
    const [planViewData,setPlanViewData] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            var options = {
                headers:{
                    'Authorization':`Token ${token.token}`
                }
            }
            axios.get('http://127.0.0.1:8000/api/view-subscription-plan/'+ planId,options)
            .then((response)=>{
                console.log(response.data.data)
                setPlanViewData(response.data.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }

    },[token,planId])

    //This plan ternary given to encounter the 'reading split' error 

    const plan_description = planViewData.plan_description ? planViewData.plan_description.split(',') : []

    console.log(token)
    const handleAddUserSubscription = ()=>{
    
        var options = {
            headers:{
                'Authorization':`Token ${token.token}`
                }
            }
        
        axios.post('http://127.0.0.1:8000/api/user-to-subscription-plan',{ subscription_plan:planId },options)
        .then((response)=>{
            toast.success(response.data.message,{style:{
                borderRadius: '10px',
                background: 'rgba(51, 51, 51, 0.82)',
                fontWeight:'400',
                color: '#fff',
              }},)

            setTimeout(()=>{
                navigate('/movie-list')
            },2400)
            console.log(response.data.message)
        })
        .catch((error)=>{
            toast.success(error.response.data.error,{style:{
                borderRadius: '8px',
                background: 'rgba(51, 51, 51, 0.82)',
                fontWeight:'400',
                color: '#fff',  
              }},)
            console.log(error)
        })
    }


  return (
    <div id='checkoutBody'>
        <div className="container">
            <div className="row">
                <div className="col-12 mt-5">
                    <div className="card" id='MainCard' >
                        <div className="card-header">
                            <h1 className='text-center text-white'>{planViewData.plan_name}</h1>
                        </div>
                        <div className="card-body">
                            <h3 className='card-title text-center text-white'>&#8377;{planViewData.plan_price}</h3>

                            <div className="col-8 offset-2">
                            <table className='table table-hover '>
                                <tbody id='cardTable'>
                                <tr className='text-center h5'>
                                    <td className='w-25 text-white'>Validity</td>
                                    <td className='text-danger w-25'>{planViewData.plan_validity} Days</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                        </div>
                        <h5 className='card-title text-center text-info font-weight-bold'>Features</h5>
                        <ul className="list-group list-group-flush text-center" style={{fontWeight:'500'}}>
                            {
                                plan_description.map((desItems,indx)=>(

                                    <li key={indx} id="ViewCardList" className="list-group-item">&nbsp;{desItems}</li>
                                ))
                            }
                        </ul>
                        <div className="card-body text-center">
                            <button id='payBtn' className='btn' onClick={handleAddUserSubscription}>Pay now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col text-center mt-5">
                    <Link to={'/subscription-plans'} className='btn btn-outline-danger' style={{padding:'5px 60px',borderRadius:'8px'}}>Back</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage;