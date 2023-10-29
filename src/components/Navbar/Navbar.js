import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <div className='nav-list left-list'>
                <h3 className='nav-item nav-logo'>Kluster Bookstore</h3>
            </div>
            <div className='nav-list right-list'>
                <Link to='/' className='nav-item'>Home</Link>
                <Link to='/books' className='nav-item'>Books</Link>
                <Link to='/authors' className='nav-item'>Authors</Link>
                <Link to='/cart' className='nav-item'>Cart</Link>
            </div>
        </nav>
    )
}

export default Navbar