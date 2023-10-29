import React, { useEffect, useState } from 'react'
import Book from '../../components/Book/Book'
import { BOOK_LIST, maxQuery, startIndex, DEFAULT_IMAGE, authorQuery } from '../../Api';
import { useParams } from 'react-router-dom';

const Books = () => {
    const { person } = useParams();
    const [page, setPage] = useState(0)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(-1);
    useEffect(() => {
        async function getBooks() {
            const url = person ? `${BOOK_LIST}${authorQuery(person)}` : `${BOOK_LIST}${startIndex(page*10)}${maxQuery(10)}`
            const response = await fetch(url);
            const booksData = await response.json();
            setTotalItems(booksData.totalItems);
            setBooks(booksData.items);
            setLoading(false);
        }
        getBooks();
    }, [page])

    function changePage(type) {
        setLoading(!loading);
        if (type === 'prev')
            setPage(page - 1)
        else
            setPage(page + 1)
        setLoading(!loading);
    }

    return (
        <>
            {
                loading ?
                    'Loading ...' :
                    totalItems <=0 ? <h1 style={{margin: '3rem 0', textAlign: 'center'}}>No Results Found</h1> :
                    <>
                        <p style={{ textAlign: 'center' }}>Page: {page + 1}</p>
                        <div className='books-row flex-wrap'>
                            {
                                books.map((bookInfo, index) => {
                                    const book = bookInfo.volumeInfo;
                                    if (bookInfo.id === "EHqaAAAAIAAJ") console.log(book)
                                    return <Book key={index} id={bookInfo.id} img={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : DEFAULT_IMAGE} title={book.title} desc={book.description} />
                                })
                            }
                        </div >
                        <div className='pagination' style={{ margin: '2rem auto', width: 'max-content' }}>
                            {page > 1 && <button style={{ marginRight: '1rem', background: 'lightgrey', padding: '1rem', cursor: 'pointer' }} onClick={() => changePage('prev')}>Prev</button>}
                            {totalItems >= 10 && <button style={{ background: 'lightgrey', padding: '1rem', cursor: 'pointer' }} onClick={() => changePage('next')}>Next</button>}
                        </div>
                    </>
            }
        </>
    )
}

export default Books