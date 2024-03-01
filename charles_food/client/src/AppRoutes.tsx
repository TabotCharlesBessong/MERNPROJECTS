// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout children="Hello my people home" />} />
      <Route path='/profile' element={"User profile"} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes