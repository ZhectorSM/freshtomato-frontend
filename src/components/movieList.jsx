import React, { Component } from "react";
import "./movieList.scss";
import Tour from "./Tour";
import { movieData } from "./tourData";

export default class MovieList extends Component {
  state = {
    movies: movieData
  };

  render() {
    const { movies } = this.state;

    return (
      <section className="tourlist">
        {movies.map(movie => (
          <Tour key={movie.id} movie={movie} Tour />
        ))}
      </section>
    );
  }
}
