import styles from '../styles/MoviesWatchlist.module.css'
import AddWatchList from '../assets/add-watchlist.svg?react'
import RemoveWatchList from '../assets/remove-watchlist.svg?react'
import MarkAsComplete from '../assets/mark-as-complete.svg?react'
import { getWatchlist } from '../services/WatchlistService'
import { useState, useEffect } from 'react'

export default function MoviesWatchlist() {
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        async function loadWatchlist() {
            try {
                const data = await getWatchlist()
                setWatchlist(data)
            } catch (err) {
                throw new Error(err)
            }
        }
        loadWatchlist()
    }, [])

    const renderContent = () => {
        // Empty watchlist
        if (watchlist.length === 0) {
            return (
                <section className={styles.playground}>
                    <h3 className={styles.watchlist}>Your watchlist is looking a little empty</h3>
                    <span>
                        <AddWatchList />
                        <p>Let's add some movies!</p>
                    </span>
                </section>
            )
        }

        // Non-empty watchlist
        if (watchlist.length > 0) {
            return (
                <section className={styles.watchlistContainer}>
                    {watchlist.map((movie) => (
                        <div key={movie.id}>
                            <div className={styles.movie}>
                                <img
                                    className={styles['movie-cover']}
                                    src={movie.poster}
                                    alt={`${movie.title} Cover`}
                                />
                                <div className={styles['movie-details']}>
                                    <h3 className={styles['movie-title']}>
                                        {movie.title}
                                        <span className={styles['movie-ratings']}>⭐ {movie.rating}</span>
                                    </h3>
                                    <div className={styles['movie-meta']}>
                                        <p className={styles.runtime}>{movie.duration}</p>
                                        <p className={styles.genre}>{movie.genres}</p>
                                    </div>
                                    <div className={styles['watchlist-container']}>
                                        <button onClick={null} className={styles['watchlist-btn']}>
                                            <RemoveWatchList className={styles['watchlist-icon']} />
                                            Remove
                                        </button>
                                        <button onClick={null} className={styles['watchlist-btn']}>
                                            <MarkAsComplete className={styles['watchlist-icon']} />
                                            Mark as Watched
                                        </button>
                                    </div>
                                    <p className={styles['movie-description']}>{movie.description}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))

                    }
                </section>
            )
        }
    }
    return (
        <>
            {renderContent()}
        </>
    )
}