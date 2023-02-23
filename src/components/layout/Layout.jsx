import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/navigation/header/Header' 

import Footer from '@/components/navigation/footer/footer'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Outlet />
            <Header />
            {children}

            
            <Footer/>
        </React.Fragment>

    )
}

export default Layout