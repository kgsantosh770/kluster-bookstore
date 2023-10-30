import React, { useEffect, useState, useRef } from 'react'
import Book from '../../components/Book/Book'
import { BOOK_LIST, maxQuery, startIndex, DEFAULT_IMAGE, authorQuery, GENRES, SINGLE_BOOK } from '../../Api';
import { useParams } from 'react-router-dom';

const Books = () => {
    const { person } = useParams();
    const [page, setPage] = useState(0)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(-1);
    const genreRef = useRef(null);
    const sortRef = useRef(null);

    useEffect(() => {
        async function getBooks() {
            const url = person ? `${BOOK_LIST}${authorQuery(person)}` : `${BOOK_LIST}${startIndex(page * 10)}${maxQuery(10)}`
            const response = await fetch(url);
            const booksData = await response.json();
            return booksData;
        }
        getBooks()
            .then(booksData => {
                setTotalItems(booksData.totalItems);
                setBooks(booksData.items);
                setLoading(false);
            })
    }, [page, person])

    function changePage(type) {
        setLoading(!loading);
        if (type === 'prev')
            setPage(page - 1)
        else
            setPage(page + 1)
        setLoading(!loading);
    }

    async function applyFilter() {
        setLoading(true);
        let url = SINGLE_BOOK + '?q=';
        if (genreRef.current.value !== 'Select genre')
            url += 'genre:' + genreRef.current.value;
        if (genreRef.current.value !== 'Select genre' && sortRef.current.value !== 'Select')
            url += '&'
        if (sortRef.current.value !== 'Select')
            url += 'orderBy=' + sortRef.current.value
        const response = await fetch(url);
        const booksData = await response.json();
        console.log(booksData)
        setTotalItems(booksData.totalItems);
        setBooks(booksData.items);
        setLoading(false);
    }

    return (
        <>
            {
                loading ?
                    'Loading ...' :
                    totalItems <= 0 ? <h1 style={{ margin: '3rem 0', textAlign: 'center' }}>No Results Found</h1> :
                        <>
                            <div className='filter'>
                                <p>Filters:</p>
                                <div>
                                    <label>Genre: </label>
                                    <select style={{ textTransform: 'capitalize' }} ref={genreRef}>
                                        <option key={0}>Select genre</option>
                                        {
                                            GENRES.map((genre, index) => <option key={index + 1} style={{ textTransform: 'capitalize' }}>{genre}</option>)
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label>Sort by: </label>
                                    <select style={{ marginTop: '1rem', textTransform: 'capitalize' }} ref={sortRef}>
                                        <option key={0}>Select</option>
                                        {
                                            ['relevance', 'newest'].map((genre, index) => <option key={index + 1} style={{ textTransform: 'capitalize' }}>{genre}</option>)
                                        }
                                    </select>
                                </div>
                                <button style={{ padding: '.25rem', marginTop: '1rem' }} onClick={() => applyFilter()}>Apply Filters</button>
                            </div>
                            <p style={{ textAlign: 'center' }}>Page: {page + 1}</p>
                            <div className='books-row flex-wrap'>
                                {
                                    books.map((bookInfo, index) => {
                                        const book = bookInfo.volumeInfo;
                                        return <Book key={index} id={bookInfo.id} img={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : DEFAULT_IMAGE} title={book.title} desc={book.description} />
                                    })
                                }
                            </div >
                            <div className='pagination' style={{ margin: '2rem auto', width: 'max-content' }}>
                                {page >= 1 && <button className='btn' style={{ marginRight: '1rem' }} onClick={() => changePage('prev')}>Prev</button>}
                                {totalItems >= 10 && <button className='btn' onClick={() => changePage('next')}>Next</button>}
                            </div>
                        </>
            }
        </>
    )
}

export default Books