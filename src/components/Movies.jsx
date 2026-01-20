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
    const movie_name = "Harry Porter"
    const formatted_movie_name = movie_name.replace(" ", "+")
    // fetch(`https://www.omdbapi.com/?s=${formatted_movie_name}&apikey=${API_KEY}`)
    fetch(`https://www.omdbapi.com/?s=${formatted_movie_name}&apikey=${import.meta.env.VITE_OMDb_API_KEY}`)
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