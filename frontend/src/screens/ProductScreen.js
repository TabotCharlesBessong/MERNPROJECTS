import React from 'react'
import {data} from '../data'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'

const ProductScreen = (props) => {
  const product = data.products.find((x) => x._id === props.match.params.id); 
  if(!product){
    return (
      <div>
        <h2>
          product not found
        </h2>
      </div>
    )
  }
  return (
    <>
    <Link to ="/">Back to Home</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews}/>
            </li>
            <li>{product.price}</li>
            <li>Description:</li>
            <p>{product.description}</p>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div>${product.price}</div>
                </div>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {
                      product.roomsFree>0? (<span className="success">Room(s) Available</span>): (<span className="error">All Rooms taken</span>)
                    }
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">
                  Buy Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductScreen
