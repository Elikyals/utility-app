import styles from '../styles/Movies.module.css'
import MovieIcon from "../assets/movie.svg?react"

export default function Movies() {
    return (
        <>
            <header className={styles.header}>
                <h2>Find the film</h2>
                <a>My Watchlist</a>
            </header>
            <form id="search-form" name="search-form">
                <div className={styles.search}>
                    <span className={`${styles['search-icon']} material-symbols-outlined`}>search</span>
                    <input id="search-box" className={styles['search-input']} type="search" name="search" placeholder="Search for a movie" />
                    <div className={styles.vline}></div>
                    <input className={styles['search-btn']} type="submit" value="Search" />
                </div>
            </form>
            <section className={styles.playground}>
                <MovieIcon className={styles.icon} />
                <h3>Start exploring</h3>
            </section>
        </>
    )
}