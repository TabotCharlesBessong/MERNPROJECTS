
import React from 'react'
import Post from './Post/Post.js'
import useStyles from './Styles.js'

const Posts = () => {
  const classes = useStyles()
  return (
    <>
      <Post/>
      <Post/>
    </>
  )
}

export default Posts