import React from 'react'
import {FaStar , FaStarHalf } from 'react-icons/fa';

const Rating = (props) => {
  const {rating, numReviews} = props;
  return (
    <div>
      <div className="rating">
        <span>{rating >=1?<FaStar/>:rating>=0.5?<FaStarHalf/>:''} </span>
        <span>{rating >=2?<FaStar/>:rating>=1.5?<FaStarHalf/>:''} </span>
        <span>{rating >=3?<FaStar/>:rating>=2.5?<FaStarHalf/>:''} </span>
        <span>{rating >=4?<FaStar/>:rating>=3.5?<FaStarHalf/>:''} </span>
        <span>{rating >=5?<FaStar/>:rating>=4.5?<FaStarHalf/>:''} </span>
        <span>
          {numReviews + ' reviews'}
        </span>
      </div>
    </div>
  )
}

export default Rating
