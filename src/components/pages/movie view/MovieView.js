import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import "./movieview.css";

const MovieView = () => {
  const token = useSelector((store) => store.auth.user);
  const { movieId } = useParams();
  const [viewData, setViewData] = useState({});
  const [movieRatingMesssage, setMovieRatingMesssage] = useState('');
  const [justRefresh,setJustRefresh] = useState(0) // state to update rating when user rating done

  const navigate = useNavigate()


  console.log(viewData);

  // Default scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      var options = {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      };
    }
    // UpdateRating() //call 1 no need

    axios.get("http://127.0.0.1:8000/api/view/" + movieId, options)
      .then(
        (response) => {
          setViewData(response.data.data)
          console.log(response.data.data)
        }
      )
      .catch((error) => console.log(error));
  }, [token,movieId,justRefresh]);

  console.log('refreshCount',justRefresh)

  const handleplay = ()=>{
    var options = {
      headers:{
        'Authorization':`Token ${token.token}`
      }
    }

    let WatchmovieId = {
      movie:movieId
    }

    axios.post('http://127.0.0.1:8000/api/add-to-watchhistory',WatchmovieId,options)
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
  }

  const handleRating = (rate) => {

    var options = {
      headers:{
        'Authorization':`Token ${token.token}`
      }
    }

    var movieRating = {
      movie:movieId,
      movie_rating:rate
    }

    console.log(movieId,rate)

    axios.post('http://127.0.0.1:8000/api/user-rating',movieRating,options)
    .then((response)=>{
      setMovieRatingMesssage(response.data.message)
      setJustRefresh(justRefresh+1) // The state given to change the updation instantly and given it as a variable in useEffect
      setTimeout(()=>{
        //This function for disappear the notification response message
        setMovieRatingMesssage('')
      },4000)
      console.log(response)
    })
    .catch((error)=> {
      console.log(error)
    })

  };

  return (
    <div id="viewBody">
      <div className="container-fluid" style={{ padding: "0", margin: "0" }}>
        <div className="row">
          <div
            className="col"
            id="imgContainer"
            style={{
              background: `rgba(0,0,0,0.7) url(${`http://127.0.0.1:8000/${viewData.thumbnail}`}) no-repeat center center /cover `,
              // backgroundSize: "cover",
              // backgroundPosition:'center',
              backgroundBlendMode: "darken",
            }}
          >
            <div
              className="row m-5"
              // style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-10 col-md-10 col-lg-4 mr-lg-5 mr-xl-3 col-xl-4">
                <div
                  className="card ml-3 ml-sm-0"
                  style={{ width: "21.875rem", height: "15.375rem" }}
                >
                  <img
                    id="shortCard"
                    className="card-img "
                    src={`http://127.0.0.1:8000/${viewData.thumbnail}`}
                    alt="thumbnail-image"
                    style={{ height: "15.27rem" }}
                  />
                </div>
              </div>
              <div
                className="col-12 mt-3 col-md-10 col-lg-7 col-xl-6 ml-lg-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h2 className="text-white ml-3 ml-sm-0 ml-lg-4">
                  {viewData.title}
                </h2>
                <h4 className="text-white  ml-3 ml-sm-0 ml-lg-4 mt-2">Overview</h4>
                <p className="text-white ml-3 ml-sm-0 ml-lg-4">
                  {viewData.description}
                </p>
                <h5 className="text-white ml-3 ml-sm-0 ml-lg-4">
                  Rating:&nbsp;{viewData.movie_rating}
                  <span style={{ color: "orange" }}>&#9733;</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-7 mt-4 mr-2">
            <video
              key={viewData.id}
              controls
              style={{ width: "100%", height: "90%" }}
              onPlay={handleplay}
            >
              <source
                src={`http://127.0.0.1:8000/${viewData.video}`}
                type="video/mp4"
              />
            </video>
          </div>

          {/* used react-simple-star-rating */}
          <div
            className="col-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5 className="text-white">Rate</h5>
            <Rating
              initialValue={0}
              size={28}
              allowFraction={true}
              fillColor="orange"
              transition={true}
              onClick={handleRating}
            />
          {movieRatingMesssage? <div id="ratingMesaage" className="text-white">{movieRatingMesssage}</div>:''}
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button onClick={()=>navigate('/movie-list')} id="viewBackbtn" className="btn btn-outline-danger mb-4">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieView;
