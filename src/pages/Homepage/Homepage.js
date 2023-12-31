import React, { useEffect, useState } from 'react'
import Book from '../../components/Book/Book'
import { BOOK_LIST, maxQuery } from '../../Api'

const Homepage = () => {
    const [featuredBooks, setFeaturedBooks] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFeaturedBooks() {
            const response = await fetch(`${BOOK_LIST}${maxQuery(10)}`);
            let featuredBooks = await response.json();
            return featuredBooks;
        }
        getFeaturedBooks()
            .then(featuredBooks => {
                setFeaturedBooks(featuredBooks.items);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <h1 className='welcome-note' style={{textAlign:'center', marginBottom: '3rem'}}>Welcome to Kluster Bookstore</h1>
            <h2>Featured Books</h2>
            {
                loading ?
                    'Loading ...' :
                    <div className='section-wrapper' style={{overflow: 'hidden'}}>
                        <div className='books-row' style={{justifyContent: 'start'}}>
                            {
                                featuredBooks.map((bookInfo) => {
                                    const book = bookInfo.volumeInfo;
                                    return <Book key={bookInfo.id} id={bookInfo.id} img={book.imageLinks.smallThumbnail} title={book.title} desc={book.description} />
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default Homepage