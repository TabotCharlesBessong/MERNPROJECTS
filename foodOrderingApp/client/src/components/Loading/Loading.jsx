import React from 'react'
import classes from './loading.module.css'
import { useLoading } from '../../hooks/useLoading'
import images from '../../constant/images'

const Loading = () => {
  const {isLoading} = useLoading()
  if(!isLoading) return
  return (
    <div className={classes.container} >
      <div className={classes.items}>
        <img src={images.loader} alt="Loading" />
        <h1>Loading....</h1>
      </div>
    </div>
  )
}

export default Loading