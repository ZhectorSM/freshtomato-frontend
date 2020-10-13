import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import axios from 'axios'
import PropTypes from "prop-types";
import {connect} from "react-redux";


const StarRating = (props)=> {
    
    const  [hover, setHover] = useState(null);

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
            onClick={()=> props.setRating(ratingValue)}
            />
             <FaStar className="star"
              color={ratingValue <= (hover || props.rating) ? "#ffc107" : "#e4e5e9"}
               size={65}
               onMouseEnter={()=> setHover(ratingValue)}
            onMouseLeave={()=> setHover(null)}
               />
             </label>
                         
        );
    })}
<h5>The rating is: {props.rating}</h5>
<input type="text" onChange={e=> props.setReview(e.target.value)}/>
    </div>
    );
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StarRating);


