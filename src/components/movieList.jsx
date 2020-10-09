import React, { Component } from "react";
import "./movieList.scss";
import Movie from "./movie";
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
          <Movie key={movie.id} movie={movie} Tour />
        ))}
      </section>
    );
  }
}
