import React from 'react'
import './Book.css'

const Book = (props) => {
  return (
    <div className="book-wrapper">
        <img src={props.img} alt={props.title} />
        <p className='title'>Title: {props.title}</p>
        <p className='desc'>Desc: {props.desc}</p>        
    </div>
  )
}

export default Book