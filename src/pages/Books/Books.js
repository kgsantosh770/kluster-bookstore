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
    const [genre, setGenre] = useState('Select genre');
    const [sort, setSort] = useState('Select');

    async function getBooks(url) {
        const response = await fetch(url);
        const booksData = await response.json();
        return booksData;
    }

    useEffect(() => {
        const url = person ? `${BOOK_LIST}${authorQuery(person)}` : `${BOOK_LIST}${startIndex(page * 10)}${maxQuery(10)}`
        getBooks(url)
            .then(booksData => {
                setTotalItems(booksData.totalItems);
                setBooks(booksData.items);
                setLoading(false);
            })
    }, [page, person])

    useEffect(() => {
        let url = SINGLE_BOOK + '?q=';
        if (genre !== 'Select genre')
            url += 'genre:' + genre;
        if (genre !== 'Select genre' && sort !== 'Select')
            url += '&'
        if (sort !== 'Select')
            url += 'orderBy=' + sort
        if (genre === 'Select genre' && sort === 'Select')
            return;
        setLoading(true);
        getBooks(url)
            .then(booksData => {
                setTotalItems(booksData.totalItems);
                setBooks(booksData.items);
                setPage(0);
                setLoading(false);
            })

    }, [genre, sort])


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
                    totalItems <= 0 ? <h1 style={{ margin: '3rem 0', textAlign: 'center' }}>No Results Found</h1> :
                        <>
                            {
                                person == undefined &&
                                <div className='filter'>
                                    <p>Filters:</p>
                                    <div>
                                        <label>Genre: </label>
                                        <select style={{ textTransform: 'capitalize' }} value={genre} onChange={(e) => setGenre(e.target.value)}>
                                            <option key={0}>Select genre</option>
                                            {
                                                GENRES.map((genre, index) => <option key={index + 1} style={{ textTransform: 'capitalize' }}>{genre}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>Sort by: </label>
                                        <select style={{ marginTop: '1rem', textTransform: 'capitalize' }} value={sort} onChange={(e) => setSort(e.target.value)}>
                                            <option key={0}>Select</option>
                                            {
                                                ['relevance', 'newest'].map((genre, index) => <option key={index + 1} style={{ textTransform: 'capitalize' }}>{genre}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            }
                            <p style={{ textAlign: 'center' }}>Page: {page + 1}</p>
                            <div className='books-row flex-wrap'>
                                {
                                    books.map((bookInfo, index) => {
                                        const book = bookInfo.volumeInfo;
                                        return <Book key={index} id={bookInfo.id} img={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : DEFAULT_IMAGE} title={book.title} desc={book.description ? book.description : '-'} />
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