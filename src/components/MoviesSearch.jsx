import styles from '../styles/MoviesSearch.module.css'
import MovieIcon from "../assets/movie.svg?react"
import AddWatchList from "../assets/add-watchlist.svg?react"
import RemoveWatchList from '../assets/remove-watchlist.svg?react'
import { useState, useEffect } from 'react'
import { addToWatchlist, movieInWatchlist, removeFromWatchlist } from '../services/WatchlistService.js'

export default function MoviesSearch() {
    const [searchInput, setSearchInput] = useState('')
    const [movieResults, setMovieResults] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [watchlistStatus, setWatchlistStatus] = useState({})
    const [refreshWatchlist, setRefreshWatchlist] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            setIsLoading(true)
            searchMovie(searchInput)
            setSearchInput('')
        }
    }
    
    const searchMovie = (movie_name) => {
        const formatted_movie_name = movie_name.trimEnd().replaceAll(" ", "+")
        fetch(`https://www.omdbapi.com/?s=${formatted_movie_name}&apikey=${import.meta.env.VITE_OMDb_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setHasSearched(true)
            if (data.Response === 'False') {
                setMovieResults([])
                setIsLoading(false)
            }
            else {
                const movieListID = data.Search.map((movieItem) => {
                    return movieItem.imdbID
                })
                const uniquemovieListID = movieListID.filter((value, index, array) => 
                    array.indexOf(value) === index)
                getMovieDetails(uniquemovieListID).then(details => {
                    setMovieResults(details)
                    setIsLoading(false)
                })
            }
        })
    }

    const getMovieDetails = async (arrMovieLisID) => {
        const promises = arrMovieLisID.map(movieID =>
            fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${import.meta.env.VITE_OMDb_API_KEY}`)
                .then(response => response.json())
        )
        const movieDetails = await Promise.all(promises)
        return movieDetails        
    }

    useEffect(() => {
        if (movieResults && movieResults.length > 0) {
            movieResults.forEach(async (movie) => {
                const isInWatchlist = await movieInWatchlist(movie.imdbID)
                setWatchlistStatus(prev => ({
                    ...prev,
                    [movie.imdbID]: isInWatchlist
                }))
            })
        }
    }, [movieResults, refreshWatchlist])

    const renderContent = () => {
        // Initial state - no search yet
        if (!hasSearched) {
            return (
                <section className={styles.playground}>
                    <MovieIcon className={styles.icon} />
                    <h3>Start exploring</h3>
                </section>
            )
        }

        // Loading state
        if (isLoading) {
            return (
                <section className={styles.playground}>
                    <h3>Searching...</h3>
                </section>
            )
        }

        // No results found
        if (movieResults && movieResults.length === 0) {
            return (
                <section className={styles.playground}>
                    <p className={styles.missingCatalog}>Unable to find what you're looking for. Please try another search.</p>
                </section>
            )
        }

        // Show results
        if (movieResults && movieResults.length > 0) {
            return (
                <section className={styles.results}>
                    {movieResults.map((detail) => (
                        <div key={detail.imdbID}>
                            <div className={styles.movie}>
                                <img 
                                    className={styles['movie-cover']}
                                    src={detail.Poster} 
                                    alt={`${detail.Title} Cover`}
                                />
                                <div className={styles['movie-details']}>
                                    <h3 className={styles['movie-title']}>
                                        {detail.Title}
                                        <span className={styles['movie-ratings']}>⭐ {detail.imdbRating}</span>
                                    </h3>
                                    <div className={styles['movie-meta']}>
                                        <p className={styles.runtime}>{detail.Runtime}</p>
                                        <p className={styles.genre}>{detail.Genre}</p>
                                        {watchlistStatus[detail.imdbID] ? (
                                            <button onClick={() => {
                                                removeFromWatchlist(detail.imdbID); setRefreshWatchlist(prev => !prev)
                                                }} className={styles['watchlist-btn']}>
                                                <RemoveWatchList className={styles['watchlist-icon']} />
                                                Remove
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWatchlist(detail); 
                                                setRefreshWatchlist(prev => !prev)}} className={styles['watchlist-btn']}>
                                                <AddWatchList className={styles['watchlist-icon']} />
                                                Watchlist
                                            </button>
                                        )}
                                    </div>
                                    <p className={styles['movie-description']}>{detail.Plot}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </section>
            )
        }
    }

    return (
        <>
            <form id="search-form" onSubmit={handleSearch}>
                <div className={styles.search}>
                    <span className={`${styles['search-icon']} material-symbols-outlined`}>search</span>
                    <input 
                        id="search-box" 
                        className={styles['search-input']} 
                        type="search" 
                        placeholder="Search for a movie"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className={styles.vline}></div>
                    <input className={styles['search-btn']} type="submit" value="Search" />
                </div>
            </form>
            {renderContent()}
        </>
    )
}