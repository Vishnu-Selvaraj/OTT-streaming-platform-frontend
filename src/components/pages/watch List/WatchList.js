import React,{useState,useEffect} from 'react'
import Card from '../cards/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';
import './watchlist.css'

const WatchList = () => {

  const token = useSelector((store)=>store.auth.user)
  const [watchListMovies,setWatchListMovies] = useState([])

  useEffect(()=>{
    if(token){
      var options = {
        headers:{
          'Authorization':`Token ${token.token}`
        }
      }
      axios.get('http://127.0.0.1:8000/api/get-watchlist-movies',options)
      .then((response)=>{
        setWatchListMovies(response.data.data)
        console.log(response.data.data)
    })
      .catch((error)=>console.log(error))

    }
  },[token])

  //Handles the watchList movie delete this passed as a props to the card component
  const handleRemoveFromWatchlist = (movieId)=>{
    
    var filteredMoviesAfterDelete = watchListMovies.filter(movie=>movie.id !== movieId)
    setWatchListMovies(filteredMoviesAfterDelete) // Update the movies excluding deleted
  
    if(token){

      var options = {
        headers:{
          'Authorization':`Token ${token.token}`
        }
      }
      axios.delete('http://127.0.0.1:8000/api/delete-watchlist-movie/'+ movieId,options)
      .then((response)=>{
        toast.success('Movie removed from your watchlist.',{style:{
          borderRadius: '10px',
          background: 'rgba(51, 51, 51, 0.82)',
          fontWeight:'400',
          color: '#fff',
        }})
        console.log(response)})
      .catch((error)=>console.log(error))

    }

  }

  return (
    <div id='watchListBody'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-11 mx-3 mx-sm-4 mx-md-4 mx-lg-5 ">
                    <h2 className='mt-3'><Link to={'/movie-list'}><IoArrowBackOutline id='WatchListbackicon' /></Link></h2>
                    <h1 className='text-center text-white mt-3 mb-4'>My Watch List</h1>
                        <Card data = {watchListMovies} removeBtn ={true} onDelete = {handleRemoveFromWatchlist} presentInWatchlist = {true}/>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default WatchList;