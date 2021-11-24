import React from 'react';
import './index.css'
import {data} from './data'

import Products from './components/Products';

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
                        <Products key ={product._id} product={product}>

                        </Products>
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
