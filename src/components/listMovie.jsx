import React from 'react';
import axios from "axios";



const ListMovie =(req,res)=>{
    
let list;
    axios.get('http://localhost:8000/admin/', list)
  .then(respond =>{
    console.log(respond.data);
  })
  .catch(err =>{
      res.json({msg: err})
    // console.log(err);
  })
return(
    <div>aaa</div>
    )
}
export default ListMovie;