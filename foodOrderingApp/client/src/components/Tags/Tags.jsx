import React from 'react'
import classes from './tags.module.css'
import { Link } from 'react-router-dom'

const Tags = ({tags,forFoodPage}) => {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? "start" : "center",
      }}
    >
      {tags.map((tag) => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}

export default Tags