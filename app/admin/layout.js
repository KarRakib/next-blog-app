import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import './globals.css';

const layout = ({children}) => {
  return (
    <div>
        <Header />
        <SideBar />
        {/* <Aos */}
        {children}
    </div>
  )
}

export default layout