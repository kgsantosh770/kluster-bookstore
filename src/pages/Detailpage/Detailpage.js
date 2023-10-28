import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

const Detailpage = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBook() {
            const response = await fetch(`https://gutendex.com/books?ids=${id}`)
            let book = await response.json();
            setBook(book.results[0]);
            setLoading(false);
        }
        getBook();
    }, [])

    return (
        <>
            {
                loading ?
                    'Loading' :
                    <div className='detail-page'>
                        <img src={book.formats['image/jpeg']} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p><b>Author:</b> {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}</p>
                        <p><b>Genre:</b> {book.bookshelves.join(', ')}</p>
                        <p><b>Subjects:</b> <br/>{book.subjects.join(' ')}</p>
                    </div>
            }
        </>
    )
}

export default Detailpage