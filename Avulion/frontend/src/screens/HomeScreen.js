import React, { useEffect } from 'react'
import Products from '../components/Products';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productAction';


const HomeScreen = () => {
  const dispatch = useDispatch()
  const productLists = useSelector((state) => state.productLists);
  const {loading ,error , products} = productLists

  useEffect(() =>{
    dispatch(listProducts())
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
