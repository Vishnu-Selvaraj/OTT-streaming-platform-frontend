import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./watchhistory.css";

const WatchHistory = () => {
  const token = useSelector((store) => store.auth.user);
  const [watchHistoryData, setWatchHistoryData] = useState([]);
  const [watchHistoryDate, setWatchHistoryDate] = useState([]);


  useEffect(() => {
    if (token) {
      var options = {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      };
      axios
        .get("http://127.0.0.1:8000/api/get-watchhistory-movies", options)
        .then(
          (response) => (
            setWatchHistoryData(response.data.data || []),
            setWatchHistoryDate(response.data.watch_history_date || []), // set the watchHistory date
            console.log(response.data)
          )
        )
        .catch((error) => console.log(error));
    }
  }, [token]);

  return (
    <div id="historybody">
      <div className="container-fluid">
        <div className="row">
          <div className="col-11 mx-3 mx-sm-4 mx-md-4 mx-lg-5 mt-3">
          <h2><Link to={'/movie-list'}><IoArrowBackOutline id='WatchHistorybackicon' /></Link></h2>
            <h1 className="text-center text-white mb-4">Watch History</h1>
            {/* <Card data = {watchHistoryData} addedDate = '1/10/2024' removeBtn ={true}/>    */}

            {
              watchHistoryData.length === 0 ? (
                <div className="col mt-5">
                  <h4 className="text-danger text-center">No Movies found!</h4>
                </div> 
              ):(
                watchHistoryData.map((item, index) => {
                  return (
                    <table className="table" key={index}>
                      <tr className="text-white text-center">
                        <td className="align-middle" id="thumbnailImg">
                          <div className="card mt-1">
                            <Link
                              className="card-link"
                              to={"/movie-view/" + item.id}
                            >
                              <img
                                className="card-img"
                                src={`http://127.0.0.1:8000/${item.thumbnail}`}
                                alt="movieImg"
                                id="thumbImage"
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="align-middle w-50">{item.title}</td>
                        <td className="align-middle">
                          {/*Inner Condition for looping the watch date */}
                          
                          {
                            watchHistoryDate.length > index ? (
                              new Date(watchHistoryDate[index].added_at).toLocaleDateString("en-GB", {
                                //For date formating
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }) 
                            ):(
                              "No Movies found"
    
                            )
                          }
                        </td>
                      </tr>
                    </table>
                  );
                })
              )




            }

            {/* <table className='table'>
                        <tr className='text-white text-center'>
                        <td id='thumbnailImg'>
                                <div className="card mt-1">
                                    <img className='card-img' src={img4} alt="movieImg" />
                                </div>
                            </td>
                            <td className='align-middle'>movie name</td>
                            <td className='align-middle'>Added Date</td>
                        </tr>
                    </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;
