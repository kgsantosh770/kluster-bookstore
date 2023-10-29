import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BOOK_LIST, startIndex, maxQuery } from '../../Api';
import './Authors.css'

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAuthors() {
            const response = await fetch(`${BOOK_LIST}${startIndex(0)}${maxQuery(40)}`);
            const booksData = await response.json();
            const allAuthors = [];
            booksData.items.forEach(book => {
                if (book.volumeInfo && book.volumeInfo.authors) {
                    allAuthors.push(...book.volumeInfo.authors);
                }
            });
            setAuthors(allAuthors);
            setLoading(false);
        }
        getAuthors();
    }, [])

    return (
        <>
            {
                loading ?
                    'Loading ...' :
                    <div className='authors-wrapper'>
                        <h2 className='title'>Few Authors</h2>
                        <ul className='authors-list'>
                            {
                                authors.map((author,index) => <Link key={index} to={`/books/authors/${author}`} className='author'>{author}</Link>)
                            }
                        </ul>
                    </div>
            }
        </>
    )
}

export default Authors