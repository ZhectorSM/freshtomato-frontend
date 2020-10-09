import React from 'react';
import "../css/addMovie.scss";


const AddMovie = () => {
    return (
      <div className="formContainer">
      <form action="">
      <label htmlFor="name">Movie title: </label>
      <input type="text" name="name" id="name" />
      <label htmlFor="description">Description: </label>
      <textarea type="text" name="description" id="description"></textarea>
      <label htmlFor="length">Movie length</label>
      <input type="text" name="length" id="length" />
      <label htmlFor="year">published year</label>
      <input type="text" name="year" id="year" />
      <label htmlFor="category">Category</label>
      <input type="text" name="category" id="category" />
      <label htmlFor="rate">Rating</label>
      <input type="text" name="rate" id="rate" />
      <label htmlFor="">Image URL</label>
      <input type="text" name="urlImage" id="urlImge" />
      </form>
      </div>
    )
}

export default AddMovie;
