import React from "react";
import './search.css'

const Search = (props) => {

  const handleSearch = (evt)=>{
    // usestate not used because use of usestate it slow down the search and when the field empty all data not showned
    var value = evt.target.value

    /*props.SubscriptionPageSearchCall to take a decision for passing the value 
    if it is true passed to subscription page else searchTerm passed to the 
    movieList page*/ 

    if(props.SubscriptionPageSearchCall){
      
      props.subscriptionPlanSearchFunc(value)
    }else{

      props.movieSearchFunction(value)
    }

  }
  
  return (
    <div id="SearchMain">
      <div className="container-fluid">
        <div className="row">
          <div className="col my-1 my-md-1 my-lg-2">
            <form class="form-inline my-lg-0 sticky-search">
              <input
                class="text-white form-control form-control-sm ml-4 ml-sm-1 mr-2 ml-md-4 col-11 col-sm-12 col-md-11 ml-xl-5 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                // value={searchTerm}
                onChange={handleSearch}
              />
              {/* <button
                class="btn btn-sm btn-outline-primary my-2 my-sm-0"
                type="submit"
                id="navbarbtn"
                // onClick={handleMovieSearch}
              >
                Search
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
