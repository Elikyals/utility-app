import styles from '../styles/MoviesWatchlist.module.css'
import AddWatchList from '../assets/add-watchlist.svg?react'

export default function MoviesWatchlist() {
    return (
        <>
            <section className={styles.playground}>
                <h3 className={styles.watchlist}>Your watchlist is looking a little empty</h3>
                <span>
                    <AddWatchList />
                    <p>Let's add some movies!</p>
                </span>
            </section>
        </>
    )
}