import React from 'react'
import './Book.css'
import { Link } from 'react-router-dom'
import Detailpage from '../../pages/Detailpage/Detailpage'

const Book = (props) => {
  return (
    <Link to={`/book/${props.id}`} element={<Detailpage />} className="book-wrapper">
        <img src={props.img} alt={props.title} />
        <p className='title'><b>Title:</b> {props.title}</p>
        <p className='desc ellipsis-text' dangerouslySetInnerHTML={{__html: '<b>Desc:</b> '+props.desc}}></p>
    </Link>
  )
}

export default Book