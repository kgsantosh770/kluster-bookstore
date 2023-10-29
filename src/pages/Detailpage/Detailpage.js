import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { DEFAULT_IMAGE, SINGLE_BOOK } from '../../Api';

const Detailpage = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBook() {
            const response = await fetch(`${SINGLE_BOOK}/${id}`)
            let book = await response.json();
            setBook(book.volumeInfo);
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
                        <img src={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : DEFAULT_IMAGE} alt={book?.title} />
                        <h3>{book?.title}</h3>
                        <p><b>Author:</b> {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown'}</p>
                        {book?.publishedDate && <p><b>Published Date:</b> {book?.publishedDate}</p>}
                        {book?.categories && <p><b>Genre:</b> {book?.categories.join(', ')}</p>}
                        <p><b>Description: </b>{book.description ? <><br/><br/><span dangerouslySetInnerHTML={{__html: book.description}}></span></> : 'Not Available'}</p>
                    </div>
            }
        </>
    )
}

export default Detailpage