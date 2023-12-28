import React from "react";
import classes from "./starRating.module.css";
import images from "../../constant/images";

const StarRating = ({ stars, size }) => {
  const styles = {
    width: size + "px",
    height: size + "px",
    marginRight: size / 6 + "px",
  };

  const Star = ({ number }) => {
    const halfNumber = number - 0.5;
    return stars >= number ? (
      <img src={images.fullStar} alt={number} style={styles} />
    ) : (
      <img src={images.emptyStar} alt={number} style={styles} />
    );
  };
  return (
    <div className={classes.rating}>
      {[1,2,3,4,5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  )
};

StarRating.defaultProps = {
  size:18
}

export default StarRating;
