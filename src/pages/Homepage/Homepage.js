import React, { useEffect, useState } from 'react'
import Book from '../../components/Book/Book'
import './Homepage.css'

const Homepage = () => {
    const [featuredBooks, setFeaturedBooks] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFeaturedBooks() {
            const response = await fetch('https://gutendex.com/books?ids=10,11,12,13,14');
            let featuredBooks = await response.json();
            setFeaturedBooks(featuredBooks.results);
            setLoading(false);
        }
        getFeaturedBooks();
    }, [])

    return (
        <div>
            <h1 className='welcome-note'>Hi,</h1>
            <h2>Featured Books</h2>
            {
                loading ?
                    'Loading ...' :
                    <div className='section-wrapper'>
                        <div className='featured-books'>
                            {
                                featuredBooks.map((book) => <Book key={book.id} id={book.id} img={book.formats['image/jpeg']} title={book.title} desc={book.subjects.join(' ')} />)
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default Homepage