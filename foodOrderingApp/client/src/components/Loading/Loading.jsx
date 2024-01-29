import React from 'react';
import { useLoading } from '../../hooks/useLoading';
import classes from './loading.module.css';
import images from '../../constants/images';

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <img src={images.loader} alt="Loading!" />
        <h1>Loading...</h1>
      </div>
    </div>
  );
}
