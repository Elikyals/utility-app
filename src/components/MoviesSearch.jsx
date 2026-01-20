import styles from '../styles/MoviesSearch.module.css'
import MovieIcon from "../assets/movie.svg?react"
import { useState } from 'react'

export default function MoviesSearch() {
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        console.log('Searching for:', searchInput)
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
            <section className={styles.playground}>
                <MovieIcon className={styles.icon} />
                <h3>Start exploring</h3>
                {/* <p className={styles.missingCatalog}>Unable to find what you're looking for. Please try another search.</p> */}
            </section>
        </>
    )
}