import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <div className='nav-list left-list'>
                <Link to='/' className='nav-logo'>Kluster Bookstore</Link>
            </div>
            <div className='nav-list right-list'>
                <Link to='' className='nav-item'>Books</Link>
                <Link to='' className='nav-item'>Authors</Link>
                <Link to='' className='nav-item'>Cart</Link>
            </div>
        </nav>
    )
}

export default Navbar