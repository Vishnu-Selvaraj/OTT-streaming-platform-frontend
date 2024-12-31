import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./card.css";

const Card = (props) => {
  const token = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

  const handleCheck = (movieId) => {
    if (token) {
      var options = {
        headers: {
          'Authorization': `Token ${token.token}`,
        },
      };
    }
    axios
      .get("http://127.0.0.1:8000/api/view/" + movieId, options)
      .then((response) => {
        navigate(`/movie-view/${movieId}`);
        console.log(response);
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          duration:2500,
          style: {
            borderRadius: "10px",
            background: "rgba(51, 51, 51, 0.9)",
            fontWeight: "400",
            color: "#fff",
          },
        });

        setTimeout(()=>{
          toast(
            <div>
              {/* <h6>{error.response.data.error}</h6> */}
              <h6 className="text-center mb-3">Get Subscription Now!</h6>
              <div className="d-flex justify-content-around">
                <button 
                  onClick={() => {
                    navigate('/subscription-plans');
                    toast.dismiss();
                  }} 
                  className="btn btn-success btn-sm mr-3"
                  style={{padding:'.25rem 1.5rem'}}
                >
                  Subscribe now
                </button>
                <button 
                  onClick={() => toast.dismiss()} 
                  className="btn btn-danger btn-sm"
                  style={{padding:'.24rem 2.3rem'}}
                >
                  Close
                </button>
              </div>
            </div>,
            {
              duration: 15000,
              position: 'bottom-right',
              style: {
                marginRight:'10px',
                marginBottom:'5px',
                borderRadius: "10px",
                background: "rgba(51, 51, 51, 0.9)",
                fontWeight: "400",
                color: "#fff",
              },
            }
          );
        },4500)
        console.log(error.response.data.error)

      });
  };

  const handleToaddWatchlist = (movieId) => {
    if (token) {
      var options = {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      };

      let WatchlistmovieId = {
        movie: movieId,
      };

      axios
        .post(
          "http://127.0.0.1:8000/api/add-to-watchlist",
          WatchlistmovieId,
          options
        )
        .then((response) => {
          /* Here the function called that change state when the movie added each time
          changes the watchlater button to tick mark */
          props.onAddtoWatchList();
          toast.success(response.data.message, {
            style: {
              borderRadius: "10px",
              background: "rgba(51, 51, 51, 0.9)",
              fontWeight: "400",
              color: "#fff",
            },
          });
          console.log(response.data.message);
        })
        .catch((error) => console.log(error.response.data.error));
    }
  };
  const handleWatchlistDeleteBtn = (movieId) => {
    props.onDelete(movieId); // The movieid passed to the parent component as argument
  };

  console.log(props);

  let watchLaterMovies = props.watchLaterMovies; // watchLaterMovies from props assigned to a variable

  return (
    <div className="row">
      {props.data.length !== 0 ? (
        props.data.map((item, ind) => {
          return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={ind}>
              <div className="card bg-dark my-3" id="card-img">
                <Link
                  className="card-link"
                  onClick={() => handleCheck(item.id)}
                >
                  {" "}
                  {/*to={`/movie-view/${item.id}`}*/}
                  <img
                    key={ind}
                    src={`http://127.0.0.1:8000/${item.thumbnail}`}
                    alt="cardImg"
                    className="card-img-top"
                    id="cardImag"
                  />
                </Link>
                <div
                  className="card-body"
                  id="cardBody"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6 className="card-title mt-2 text-white">
                    {item.movie_rating}&nbsp;
                    <span style={{ color: "orange" }}>&#9733;</span>
                  </h6>

                  {props.removeBtn ? (
                    <Link
                      id="Btnremove"
                      onClick={() => handleWatchlistDeleteBtn(item.id)}
                      className="card-link text-danger h5"
                    >
                      <FaRegTrashAlt />
                    </Link>
                  ) : // Toughest portion to provide inner condition
                  watchLaterMovies.some((movie) => movie.id === item.id) ? (
                    <>
                      <Link id="BtnAdd" className="card-link h5">
                        <TiTickOutline />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        id="BtnAdd"
                        onClick={() => handleToaddWatchlist(item.id)}
                        className="card-link h5"
                      >
                        <MdOutlineWatchLater />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col mt-5">
          <h4 className="text-danger text-center">No Movies found!</h4>
        </div>
      )}
    </div>
  );
};

export default Card;
