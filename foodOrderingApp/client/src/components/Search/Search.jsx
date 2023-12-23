import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import classes from './search.module.css'
import { useState } from 'react'

const Search = () => {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const {searchTerm} = useParams()
  console.log(term)

  const search = async () => {
    term ? navigate('/search/' + term) : navigate('/')
  }
  return (
    <div className={classes.container} >
      <input
        type="text"
        placeholder="Search Food Mine!"
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        defaultValue={searchTerm}
      />
      <button onClick={search}>Search</button>
    </div>
  )
}

export default Search