import React from 'react'
import './Book.css'
import { Link } from 'react-router-dom'
import Detailpage from '../../pages/Detailpage/Detailpage'

const Book = (props) => {
  return (
    <Link to={`/book/${props.id}`} element={<Detailpage />} className="book-wrapper">
        <img src={props.img} alt={props.title} />
        <p className='title'>Title: {props.title}</p>
        <p className='desc'>Desc: {props.desc}</p>
    </Link>
  )
}

export default Book