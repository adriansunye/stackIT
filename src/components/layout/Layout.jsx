import React from 'react'
import { Outlet } from 'react-router-dom'
import Header  from '@/components/navigation/header/Header'
import { Box } from '@mui/material'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header/>
                <Outlet />
                {children}
        </React.Fragment>
    )
}

export default Layout