import React from "react";
import { Link } from "react-router-dom";
import "./subscriptioncard.css";

const SubscriptionCard = (props) => {
  console.log(props);

  return (
    <div id="SubscribeBody">
      <div className="container-fluid">
        <div className="row mx-5">

          {props.plans && props.plans.length > 0
            ? props.plans.map((items, ind) => {
                return (
                  <div
                    className=" col my-3"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div
                      id="planCard"
                      className="card"
                      key={ind}
                      style={{ width: "16rem" }}
                    >
                      <div className="card-body">
                        <h3 className="card-title text-center">
                          {items.plan_name}
                        </h3>

                        <div className="d-flex justify-content-around">
                          <h5 className="mt-1 font-weight-bold">
                            &#8377;&nbsp;{items.plan_price}
                          </h5>
                          <Link className="btn btn-sm btn-danger h5">
                            {items.plan_validity} days
                          </Link>
                        </div>
                      </div>

                    {items.plan_description && props.isSubscriptionPageData ? (
                        <ul className="list-group list-group-flush">
                          {/* Below step convert the string into array and looped it */}
                          {items.plan_description
                            .split(",")
                            .map((des, desIndex) =>
                              // This condition to limit only 3 list to display
                              desIndex < 3 ? (
                                <li
                                  id="CardList"
                                  className="list-group-item"
                                  key={desIndex}
                                >
                                  &nbsp;{des}
                                </li>
                              ) : (
                                ""
                              )
                            )}
                        </ul>
                      ) : (
                        <div className="card-body">
                          <table className="table">
                            <tbody id="subscribitionTable">

                              {/*In below only give the condition 'props.planTakenDate.length' it showing error
                              because it is undefined to solve use 'props.planTakenDate && props.planTakenDate.length'*/}
                              
                              {props.planTakenDate && props.planTakenDate.length > 0 ? (
                                <tr>
                                  <td className="w-25">Subscribed</td>
                                  <td className="w-25">
                                    {new Date(
                                      props.planTakenDate[ind].date_of_taken
                                    ).toLocaleDateString("en-GB", {
                                      //For date formating
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </td>
                                </tr>
                              ) : (
                                <p>"No plans"</p>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {props.subBtn ? (
                        <div className="card-body text-center">
                          <Link
                            to={`/subscription-view/${items.id}`}
                            id="SubBtn"
                            className="btn btn-primary btn-block"
                          >
                            Subscribe now
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })

              : (
                  props.PrevPlanErrorMessage ? (
                  <div className="col text-center mt-4">
                    <h6 className="text-danger">{props.PrevPlanErrorMessage}</h6>
                  </div>
                ):(
                  props.currentPlanErrorMessage && (
                    <div className="col text-center mt-4">
                      <h6 className="text-danger">{props.currentPlanErrorMessage}</h6>
                    </div>
                    ) 
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
