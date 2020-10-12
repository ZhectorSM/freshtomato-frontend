import React, { Component } from "react";
import "./movie.scss";
export default class NotFound extends Component {
  render() {
    const {
      name,
      urlImage,
      description,
      length,
      year,
      category
      // rate
    } = this.props.movie; //for json  city, img, name
    if (this.props.movie) {
      return (
        <article className="movie">
          <div className="img-container">
            <img src={urlImage} alt="" height="250px" />
            <span className="close-btn">
              <i className="fas fa-window-close" />
            </span>
          </div>
          <div className="movie-info">
            <h3 className="movieTitle">{name}</h3>
            <h4>{description}</h4>
            <p className="movieYear">
              published in <span>{year}</span>
            </p>
            <br />
            <p className="movieLength">{length} min</p>
            <br />
            <p className="movieCategory">Category: {category}</p>
            <br />
            <div className="btnContainer">
              <br />
              <a className="updateBtn" href="/updateMovie">
                Edit
              </a>
              <a className="deleteBtn" href="/deleteMovie">
                Delete
              </a>
            </div>
          </div>
        </article>
      );
    }

    return <h1>Tour data doesn't exists</h1>;
  }
}
