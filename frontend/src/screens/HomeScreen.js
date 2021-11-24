import React, { useEffect, useState } from 'react'
import Products from '../components/Products';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


const HomeScreen = () => {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  useEffect(() =>{
    setLoading(true)
    const fetchData = async ()=>{
      try {
        const {data} = await axios.get('/api/products')
        setLoading(false)
        setProducts(data)
      } catch (err) {
        setError(err.message);
        setLoading(false)
      }
    }
    fetchData()
  },[])
  return (
    <>
    {loading? <LoadingBox></LoadingBox>
    :
    error?<MessageBox variant="danger">{error}</MessageBox>:
    <div className=" row center">
    {
        products.map(product => (
            <Products key ={product._id} product=
    {product}>
            </Products>
        ))
    }
    </div>
    }
      
    </>
    
  )
}

export default HomeScreen
