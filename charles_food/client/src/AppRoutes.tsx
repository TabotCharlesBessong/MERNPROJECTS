// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={"Hello world"} />
      <Route path='/profile' element={"User profile"} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes