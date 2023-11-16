import React, { ReactElement } from 'react'
import Navigationbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}: {children: ReactElement}, props: any) => {
    return (
        <>
            <Navigationbar />
                <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout