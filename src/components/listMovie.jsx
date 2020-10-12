import React, { useState } from "react";
import axios from "axios";
import "../css/listMovie.scss";

const ListMovie = (req, res) => {
  const [listMovies, setListMovies] = useState([]);

  axios
    .get("http://localhost:8000/admin/listMovie")
    .then(result => {
      console.log(result.data);
      setListMovies(result.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <>
      {listMovies.map(list => (
        <article className="movieContainer">
          <div className="img-container">
            <img src={list.urlImage} alt="" height="250px" />

            <h3>{list.name}</h3>
            <h4>{list.description}</h4>
            <p>{list.length}</p>
            <h5>category:{list.category}</h5>
            <h5>{list.rate}</h5>
          </div>
        </article>
      ))}
    </>
  );
};
export default ListMovie;
