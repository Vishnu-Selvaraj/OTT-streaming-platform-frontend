import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './landingpage.css'

const LandingPage = () => {

  const token = useSelector((store)=>store.auth.user)

  const navigate = useNavigate()

  const handleClick = (evt)=>{
    
    if(token){
      navigate('/movie-list')
    }else{
      navigate('/login')
    }
  }

  return (
    <div id='landingBody'>
        <div className="container">
            <div className="row">
                <div className="col-12 text-white text-center" id='landingcontainer'>
                <h1>Watch unlimited movies,Tv shows </h1>
                    <h3>Get membership now</h3>
                    <h3 className='mb-3'>Ready to watch ?</h3>
                    <button onClick={handleClick} id='startBtn' className='btn'>Get started</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage;