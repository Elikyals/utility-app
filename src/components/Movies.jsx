import styles from '../styles/Movies.module.css'

export default function Movies() {
    return (
        <section className={styles.playground}>
            <div className={styles.header}>
                <h2>Find the film</h2>
                <a>My Watchlist</a>
            </div>
        </section>
    )
}