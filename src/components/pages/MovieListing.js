import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../store/authSlice";
import Card from "./cards/Card";
import Navbar from "./navbar/Navbar";
import Search from "./search/Search";
import axios from "axios";
import './movieListing.css'
import './loader/loader.css' 

const MovieListing = () => {

  const token = useSelector((store)=>store.auth.user)
  const [movieData,setMovieData] = useState([])
  const [filteredMovies,setFilteredMovies] = useState([])
  const [isLoading,setLoading] = useState(false)
  const naviagte = useNavigate()
  const dispatch = useDispatch()

  const [watchListMovies,setWatchListMovies] = useState([])
  const [ChangeStateWhenWatchlistMovieAdd,setChangeStateWhenWatchlistMovieAdd] = useState(0)

  // This function handle when the movie add to the watchlist on that time state incrementing by 1

  const handleTickMark = ()=>{
    //passing the function as a props to Card component
    setChangeStateWhenWatchlistMovieAdd(ChangeStateWhenWatchlistMovieAdd + 1)
  }

  useEffect(()=>{
    const carouselElement = document.querySelector('#carouselMain') 
    const carousel = new window.bootstrap.Carousel(carouselElement,{
      interval:2000,
      ride:'carousel'
    })
  },[])

  useEffect(()=>{

    if (token){
      var options = {
        headers:{
          'Authorization':`Token ${token.token}`
        }
      }
    }
    axios.get('http://127.0.0.1:8000/api/retrieve',options)
    .then((response)=>{
      setMovieData(response.data.message)
      setFilteredMovies(response.data.message)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(true)
      setTimeout(()=>{
        if(error.response.data.error == 'blocked'){
          dispatch(removeToken())
          naviagte('/login')
      }
      console.log(error.response.data.error)
      },3000)
  
    })

    axios.get('http://127.0.0.1:8000/api/get-watchlist-movies',options)
      .then((response)=>{
        setWatchListMovies(response.data.data)
        console.log(response.data.data)
      })
      .catch((error)=>{console.log(error)})
    
  },[token,ChangeStateWhenWatchlistMovieAdd])

  //Movie search handling Function
  const handleMovieSearch = (searchTerm)=>{
    console.log(searchTerm)
    if (searchTerm.trim() === ''){
      setFilteredMovies(movieData)
    }else{
      var filteredData = movieData.filter((movie)=>movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredMovies(filteredData)
    }

  }
  console.log(watchListMovies)

  return (
    <div id="listBg">
      {
        isLoading ? (
          <div className='mainDiv'>
      <div className="loader"></div>
      </div>
        ):(
          <>
          <Navbar/>
      <div className="container" id="movieListSearch">
        <div className="row">
          <div className="col">
            <Search movieSearchFunction = {handleMovieSearch} />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-1" >
        <div className="row">
          <div className="col">
            <div
              id="carouselMain"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {
                  movieData.map((item,index)=>{
                    if (index < 5){
                      return(
                        <li key={index}
                        data-target="#carouselMain"
                        data-slide-to={`${index}`}
                        className={`${index === 0 ? 'active':''}`}
                      ></li> 
                      )
                    }
                  })
                }
              </ol>
              <div className="carousel-inner">
                
                {
                  movieData.map((item,ind)=>{

                    if(ind < 5){
                      return(
                        <div id="carouselItem" className={`carousel-item ${ind === 0 ? 'active':''}`} key={ind}>
                          <img  id="carousel-img" className="d-block" src={`http://127.0.0.1:8000/${item.thumbnail}`} alt={`slide ${ind}`} />
                        </div>
                      )
                    }
                  })
                }

              </div>
              <a
                className="carousel-control-prev"
                href="#carouselMain"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselMain"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
      {/* <div className="row mx-1"> */}
              <Card data = {filteredMovies} removeBtn ={false} watchLaterMovies = {watchListMovies} onAddtoWatchList = {handleTickMark} /> {/* movie List data passing to card */}
               
        {/* </div> */}
      </div>
      </>
        )
      }
    </div>
  );
};

export default MovieListing;
