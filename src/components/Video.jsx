import React, { Component } from "react";
import "./Video.scss";
import Tour from "./Tour";
import { tourData } from "./tourData";

export default class Video extends Component {
  state = {
    tours: tourData
  };

  render() {
    const { tours } = this.state;

    return (
      <section className="tourlist">
        {tours.map(tour => (
          <Tour key={tour.id} tour={tour} Tour />
        ))}
      </section>
    );
  }
}
