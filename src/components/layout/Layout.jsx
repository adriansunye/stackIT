import React from 'react'
import { Outlet } from 'react-router-dom'
import Header  from '@/components/navigation/header/Header'
import Footer  from '@/components/navigation/footer/Footer'
import Copyright from '@/components/navigation/footer/Copyright'
import { Box, Divider } from '@mui/material'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header/>
            <Box sx={{mt:7}}>
                <Outlet />
                {children}
                </Box>
            <Footer/>
            <Divider/>
            <Copyright/>
        </React.Fragment>

    )
}

export default Layout