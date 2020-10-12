import React, { useState } from 'react';
import "../css/addMovie.scss";
import axios from 'axios';
import ListMovie from '../components/listMovie';

const EditMovie =()=>{

    return (
    <>
    <div className="formContainer">
      <form onSubmit={(e)=> edit(e)}> 
      <label htmlFor="name">Movie title: </label>
      <br/>
    <input type="text" name="id" id="id" required="required" placeholder="id"/>
      
      <input type="text" name="name" id="name" required="required" />
      <br/>
      <label htmlFor="description">Description: </label>
      <br/>
      <textarea type="text" name="description" id="description"/>
      <br/>
      <label htmlFor="length">Movie length:</label>
      <br/>
      <input type="text" name="length" id="length" />
      <br/>
      <label htmlFor="year">published year:</label>
      <br/>
      <input type="number" name="year" id="year" />
      <br/>
      <label htmlFor="category">Category:</label>
      <br/>
      <input type="text" name="category" id="category" />
      <br/>
      <label htmlFor="rate">Rating:</label>
      <br/>
      <input type="text" name="rate" id="rate"/>
      <br/>
      <label htmlFor="">Image URL:</label>
      <br/>
      <input type="text" name="urlImage" id="urlImage" />
      <br/>
      <button id="submitBtn"type="submit">Submit</button>
      </form> 
      </div>
    </>)

}



function edit(e) {
    e.preventDefault();
    let request = {
      id: document.getElementById('id').value,
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      length: document.getElementById('length').value,
      year: document.getElementById('year').value,
      category: document.getElementById('category').value,
      rate: document.getElementById('rate').value,
      urlImage: document.getElementById('urlImage').value
    }
    axios.post('http://localhost:8000/admin/updateMovie', request)
    .then(res=>{
      alert(res.data.msg);
      
    })
    .catch(err=>{
      console.log(err);
      alert(err.data.msg);
    })
  
    e.target.reset();
  }


export default EditMovie;