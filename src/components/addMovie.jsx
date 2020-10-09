import React from 'react';
import "../css/addMovie.scss";
import axios from "axios";


const AddMovie = () => {
    return (
      <div className="formContainer">
      <form onSubmit={(e)=> add(e)}>
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
      <input type="text" name="urlImage" id="urlImage" />
      <button type="submit">Submit</button>
      </form>
      </div>
    )
}

function add(e) {
  e.preventDefault();
  let request = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    length: document.getElementById('length').value,
    year: document.getElementById('year').value,
    category: document.getElementById('category').value,
    rate: document.getElementById('rate').value,
    urlImage: document.getElementById('urlImage').value
  }
  axios.post('http://localhost:8000/admin/createMovie', request)
  .then(respond =>{
    alert(respond.data.message);
  })
  .catch(err =>{
    console.log(err);
  })

}

export default AddMovie;
