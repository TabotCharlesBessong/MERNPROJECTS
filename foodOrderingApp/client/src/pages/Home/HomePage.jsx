import React from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { getAll } from '../../services/foodServices'
import { Thumbnails } from '../../components'

const initialState = {foods:[]}

const reducer = (state,action) => {
  switch (action.type){
    case 'FOOD_LOADED':
      return {...state,foods:action.payload}
    default:
      return state

  }
}

const HomePage = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const {foods} = state

  useEffect(() => {
    getAll().then(foods => dispatch({type:'FOOD_LOADED',payload:foods}))
  },[])
  return (
    <>
      <Thumbnails foods={foods} />
    </>
  )
}

export default HomePage