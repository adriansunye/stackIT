import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Outlet />
            {children}
        </React.Fragment>
    )
}

export default Layout