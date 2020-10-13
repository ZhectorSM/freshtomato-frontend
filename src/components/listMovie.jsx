import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/listMovie.scss";
import StarRating from "../components/rating/StarRating";

const ListMovie = (req, res) => {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8000/admin/listMovies",
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };

    axios(config)
      .then(result => {
        console.log(result.data);
        setListMovies(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {listMovies.map(list => (
        <div className="movieContainer">
          <div className="img-container">
            {/* <h3>{list._id}</h3> */}
            <h4>{list.name}</h4>
            <img src={list.urlImage} alt="" />
            <p>{list.description}</p>
            <h6>
              category:{list.category}{" "}
              <span className="zoo">rate: {list.rate} </span>
              <span className="foo">{list.length}min</span>
            </h6>
            <StarRating className="star" movieId={list._id} />
            <button onclick="activateLasers()">Edit</button>
            <button onclick="activateLasers()">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListMovie;
