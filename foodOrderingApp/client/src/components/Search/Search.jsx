import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './search.module.css'
import { useEffect } from 'react'

const Search = () => {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const {searchTerm} = useParams()
  console.log(term)

  const search = async () => {
    term ? navigate('/search/' + term) : navigate('/')
    // console.log(term)
  }

  useEffect(() => {
    setTerm(searchTerm ?? '')
  },[searchTerm])
  return (
    <div className={classes.container} >
      <input
        type="text"
        placeholder="Search Food Mine!"
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  )
}

export default Search