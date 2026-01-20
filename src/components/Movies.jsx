import MoviesSearch from './MoviesSearch.jsx'
import MoviesWatchlist from './MoviesWatchlist.jsx'
import { useState } from 'react'
import styles from '../styles/Movies.module.css'

export default function Movies() {
    const [currentPage, setCurrentPage] = useState('movies')

    const renderPage = () => {
        switch (currentPage) {
            case 'movies':
                return <MoviesSearch />
            case 'watchlist':
                return <MoviesWatchlist />
            default:
                return <MoviesSearch />
        }
    }
    const handleButtonClick = () => {
        setCurrentPage(currentPage === 'movies' ? 'watchlist': 'movies')
    }
    return (
        <>
            <header className={styles.header}>
                <h2>Find the film</h2>
                <button onClick={handleButtonClick} className={styles['movie-nav-btn']}>
                    {currentPage === "movies"? "My Watchlist": "Search for movies"}
                </button>
            </header>
            {renderPage()}
        </>
    )
}