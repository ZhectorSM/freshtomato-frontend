import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import axios from 'axios'
import PropTypes from "prop-types";
import {connect} from "react-redux";


const StarRating = (props)=> {
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");
    const  [hover, setHover] = useState(null);


    const sendRating = () =>{
        const {user} = props.auth;
        console.log("sending rating: ",props.movieId,rating , review , user.id);
        
      
        let ratingData = {
            user : { id: user.id },
            id: props.movieId,
            rate: rating,
            review: review         
          }

        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/rateMovie',
            headers: {
                'x-auth-token': localStorage.getItem('jwtToken')
            },
            data: ratingData
          };
       
         axios(config)
          .then(result => {
            console.log(result.data.msg);
          })
          .catch(err => {
            console.log(err);
          }); 


    }



    return (
        <div>
    {[...Array(5)].map((star, i) => {
const ratingValue= i + 1;
        return (
        
            <label>
            <input 
            type="radio" 
            name="rating" 
            value={ratingValue} 
            onClick={()=> setRating(ratingValue)}
            />
             <FaStar className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
               size={100}
               onMouseEnter={()=> setHover(ratingValue)}
            onMouseLeave={()=> setHover(null)}
               />
             </label>
                         
        );
    })}
<h3>The rating is: {rating}</h3>
<input type="text" onChange={e=> setReview(e.target.value)}/>
<input type="button" onClick={sendRating} value="Rate"/>
    </div>
    );
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StarRating);


