import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../css/listMovie.scss";
import StarRating from "../components/rating/StarRating";
import EditMovie from "../components/editMovie";

import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
 

const ListMovie = (req, res) => {
  const [listMovies, setListMovies] = useState([]);
  const [executed, setExecuted] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);



  //get list of movies
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
  }, [executed]);




  //delete movie
  const deleteMovie = (movieId) => {
       console.log("deleteing movie:" ,movieId);

    var config = {
      method: "post",
      url: "http://localhost:8000/admin/deleteMovie",
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      },
      data: {
        id : movieId
      }
    };

    axios(config)
      .then(result => {
        console.log(result.data.msg);
        setExecuted(!executed);
      })
      .catch(err => {
        console.log(err);
      });

  }


  const editMovie = (movieId) => {
    setEditVisible(true);
    setEditMovieId(movieId);
  }

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
            <button type="button" onClick={() => {editMovie(list._id)}}>Edit</button>
            <button type="button" onClick={() => {deleteMovie(list._id)}}>Delete</button>
          </div>
          
        </div>
      ))}




      {/* dialog edit */}
      <Dialog header="Edit Movie" className="dialog-form" visible={editVisible} closable={true}>
          <EditMovie movieId={editMovieId}/>
      </Dialog>      
      
    </>
  );
};

export default ListMovie;
