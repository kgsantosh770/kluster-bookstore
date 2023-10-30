import React, { useEffect, useState } from 'react'
import { SINGLE_BOOK } from '../../Api';
import Book from '../../components/Book/Book';
import { DEFAULT_IMAGE } from '../../Api';

const Cart = () => {
    const bookIds = JSON.parse(localStorage.getItem('cart')) || [];
    const cartPrice = JSON.parse(localStorage.getItem('cartPrice')) || 0;
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getBooksByIds() {
            const bookList = [];
            for (const bookId of bookIds) {
                console.log(bookId)
                try {
                    const response = await fetch(`${SINGLE_BOOK}/${bookId}`);
                    const bookData = await response.json();
                    bookList.push(bookData);
                } catch (error) {
                    console.error(`Error fetching book with ID ${bookId}: ${error.message}`);
                }
            }
            return bookList;
        }
        getBooksByIds()
            .then(res => {
                setBooks(res);
                setLoading(false);
            })
    }, [])

    return (
        <>
            {
                loading ?
                    'Loading...' :
                    <div>
                        <h1 style={{ textAlign: 'center', margin: '0'}}>Cart Items</h1>
                        <h3 style={{ textAlign: 'center', margin: '0'}}>Total Price: INR {cartPrice}</h3>
                        <small style={{textAlign: 'center', 'display':'block', marginBottom: '3rem'}}>**Get inside the book to remove it from cart</small>
                        <div className='books-row flex-wrap'>
                            {
                                books.map((bookInfo, index) => {
                                    const book = bookInfo.volumeInfo;
                                    return <Book key={index} id={bookInfo.id} img={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : DEFAULT_IMAGE} title={book.title} desc={book.description} />
                                })
                            }
                        </div >
                    </div>
            }
        </>
    )
}

export default Cart