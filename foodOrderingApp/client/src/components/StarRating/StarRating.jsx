import React from 'react';
import classes from './starRating.module.css';
import images from '../../constants/images';
export default function StarRating({ stars, size }) {
  const styles = {
    width: size + 'px',
    height: size + 'px',
    marginRight: size / 6 + 'px',
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img src={images.fullStar} style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img src={images.halfStar} style={styles} alt={number} />
    ) : (
      <img src={images.emptyStar} style={styles} alt={number} />
    );
  }

  return (
    <div className={classes.rating}>
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}

StarRating.defaultProps = {
  size: 18,
};
