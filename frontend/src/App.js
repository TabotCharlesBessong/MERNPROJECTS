import React from 'react';
import './index.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


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
                <Router>
                <Route path="/product/:id" component={ProductScreen}>
                </Route>
                <Route path="/" component={HomeScreen} exact>
                
                </Route>
                </Router>
                
            </main>
            <footer className="row center">
                All right reserved
            </footer>
            </div>
        </>
    )
}


export default App
