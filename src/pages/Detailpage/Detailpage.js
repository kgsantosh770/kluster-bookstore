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
            console.log(book)
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

        let cartPrice = JSON.parse(localStorage.getItem('cartPrice')) || 0;
        cartPrice += parseFloat(book.saleInfo.retailPrice.amount);
        localStorage.setItem('cartPrice',cartPrice);
    }

    function removeFromCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.indexOf(book.id);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            setInCart(false)
        }
        let cartPrice = JSON.parse(localStorage.getItem('cartPrice')) || 0;
        cartPrice -= parseFloat(book.saleInfo.retailPrice.amount);
        localStorage.setItem('cartPrice',cartPrice);
    }

    const cartBtnStyle = {
        display: 'block',
        margin: '0 auto 2rem',
    }

    return (
        <>
            {
                loading ?
                    'Loading' :
                    <div className='detail-page'>
                        {
                            book.saleInfo?.saleability === 'FOR_SALE' ? inCart ?
                                <button
                                    className='btn' style={cartBtnStyle}
                                    onClick={() => removeFromCart()}
                                >Remove from Cart</button>
                                :
                                <button
                                    className='btn' style={cartBtnStyle}
                                    onClick={() => addToCart()}
                                >Add to Cart</button>
                                :
                                <p style={{textAlign: 'center'}}>BOOK NOT FOR SALE</p>
                        }
                        <img src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : DEFAULT_IMAGE} alt={book.volumeInfo?.title} style={{minWidth: '200px'}}/>
                        <h3>{book.volumeInfo?.title}</h3>
                        <p><b>Author:</b> {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                        {book.volumeInfo?.publishedDate && <p><b>Published Date:</b> {book.volumeInfo?.publishedDate}</p>}
                        {book.saleInfo?.retailPrice && <p><b>Price: </b> {book.saleInfo?.retailPrice.currencyCode} {book.saleInfo?.retailPrice.amount}</p>}
                        {book.volumeInfo?.categories && <p><b>Genre:</b> {book.volumeInfo?.categories.join(', ')}</p>}
                        <p><b>Description: </b>{book.volumeInfo.description ? <><br /><br /><span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></span></> : 'Not Available'}</p>
                    </div>
            }
        </>
    )
}

export default Detailpage