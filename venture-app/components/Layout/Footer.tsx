import React from 'react'
import { NextPage } from 'next'

const Footer: NextPage = () => {
    return (
    <footer className="mt-auto m-2 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Venture™. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        </ul>
    </footer>


    )
}

export default Footer;