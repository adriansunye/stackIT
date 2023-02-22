import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/navigation/header/Header' 

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Outlet />
            <Header />
            {children}
            </React.Fragment>
    )
}

export default Layout