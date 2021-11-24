import React from 'react';
import './index.css'
import {data} from './data'
import {FaStar} from 'react-icons/fa';

function App() {
    return (
        <>
            <div className="grid-container">
            <header className="row">
                <div className="">
                <a href="/" className="brand">avulion</a>
                </div>
                <div className="">
                <a href="/cart">Cart</a>
                <a href="/signin">Sign in</a>
                </div>
            </header>
            <main>
                <div className=" row center">
                {
                    data.products.map(product => (
                        <div key={product._id} className="card">
                            <a href={`/product/${product._id}`}>
                            <img className="medium" src={product.image} alt="" />
                               </a>
                            <div className="card-body">
                            <a href={`/product/${product._id}`}>
                                <h2>{product.name} </h2>
                            </a>
                            <div className="rating">
                                <span><FaStar/></span>
                                <span><FaStar/></span>
                                <span><FaStar/></span>
                                <span><FaStar/></span>
                                <span><FaStar/></span>
                            </div>
                            <div className="price">
                                ${product.price}
                            </div>
                            </div>
                        </div>
                    ))
                }

                </div>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
            </div>
        </>
    )
}


export default App
