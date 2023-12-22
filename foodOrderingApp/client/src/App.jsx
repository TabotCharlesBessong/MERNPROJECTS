import React from 'react'
import { Header } from './components'
import {Router,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App