import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { DEFAULT_IMAGE, SINGLE_BOOK } from '../../Api';

const Detailpage = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        async function getBook() {
            const response = await fetch(`${SINGLE_BOOK}/${id}`)
            let book = await response.json();
            setBook(book);
            if (isBookInCart(book.id)) setInCart(true);
            setLoading(false);
        }
        getBook();
    }, [id])

    function isBookInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.includes(id);
    }

    function addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length >= 10) alert('Cart is full');
        else {
            cart.push(book.id);
            localStorage.setItem('cart', JSON.stringify(cart));
            setInCart(true);
        }
    }

    function removeFromCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.indexOf(book.id);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            setInCart(false)
        }
    }

    return (
        <>
            {
                loading ?
                    'Loading' :
                    <div className='detail-page'>
                        {
                            inCart ?
                                <button
                                    className='add-cart' style={{ display: 'block', margin: '0 auto', padding: '.5rem 2rem' }}
                                    onClick={() => removeFromCart()}
                                >Remove from Cart</button>
                                :
                                <button
                                    className='add-cart' style={{ display: 'block', margin: '0 auto', padding: '.5rem 2rem' }}
                                    onClick={() => addToCart()}
                                >Add to Cart</button>
                        }
                        <img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : DEFAULT_IMAGE} alt={book.volumeInfo?.title} />
                        <h3>{book.volumeInfo?.title}</h3>
                        <p><b>Author:</b> {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                        {book.volumeInfo?.publishedDate && <p><b>Published Date:</b> {book.volumeInfo?.publishedDate}</p>}
                        {book.volumeInfo?.categories && <p><b>Genre:</b> {book.volumeInfo?.categories.join(', ')}</p>}
                        <p><b>Description: </b>{book.volumeInfo.description ? <><br /><br /><span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></span></> : 'Not Available'}</p>
                    </div>
            }
        </>
    )
}

export default Detailpage