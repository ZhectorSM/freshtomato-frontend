import React, { useState } from 'react';
import axios from "axios";
import '../css/listMovie.scss';



const ListMovie =(req,res)=>{
    
const [listMovies, setListMovies] = useState([]);
    
 axios.get('http://localhost:8000/admin/listMovie')
    .then(result =>{
        console.log(result.data);
        setListMovies(result.data)
  })
  .catch(err =>{
    
    console.log(err);
  })

 


return(
<>
    {listMovies.map(list =>(
    <div className="movieContainer">
    <img src={list.urlImage} alt=""/>
    <h3 className="movieName">{list.name}</h3>
    <h2>{list.year}</h2>

    
    </div>
    
        ))
    }
</>
)}
export default ListMovie;