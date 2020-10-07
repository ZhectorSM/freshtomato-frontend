import React, { Component } from "react";
import "./NotFound.scss";
export default class NotFound extends Component {
  render() {
    const { city, img, name } = this.props.tour; //for json  city, img, name
    if (this.props.tour) {
      return (
        <article className="tour">
          <div className="img-container">
            <img src={img} alt="" height="250px" />
            <span className="close-btn">
              <i className="fas fa-window-close" />
            </span>
          </div>
          <div className="tour-info">
            <h3>{city}</h3>
            <h4>{name}</h4>
          </div>
        </article>
      );
    }

    return <h1>Tour data doesn't exists</h1>;
  }
}
