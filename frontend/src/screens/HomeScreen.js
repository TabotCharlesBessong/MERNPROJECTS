import React from 'react'
import {data} from '../data'
import Products from '../components/Products';


const HomeScreen = () => {
  return (
    <div className=" row center">
    {
        data.products.map(product => (
            <Products key ={product._id} product=
    {product}>
            </Products>
        ))
    }
    </div>

    
  )
}

export default HomeScreen
