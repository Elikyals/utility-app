import '../styles/Navigation.css'
import { ColoredLine } from './divider'

export default function Nav() {
    return (
        <nav>
            <div className='app-logo'>
                <img src="src/assets/utility logo.png" />
                <h1>xUTILITIES</h1>
            </div>
            <ColoredLine width="90%" />
            <div className='nav-btn'>
                <button className="home-btn">
                    <img src="src/assets/home.svg" alt="Home Icon" />
                    <span>Home</span>
                </button>
                <button className="randomize-btn selected">
                    <img src="src/assets/dice.svg" alt="Randomize Icon" />
                    <span>Randomize</span>
                </button>
                <button className="lt-tracker-btn">
                    <img src="src/assets/code.svg" alt="Leetcode Tracker Icon" />
                    <span>LeetCode Tracker</span>
                </button>
                <button className="portfolio-btn">
                    <img src="src/assets/portfolio.svg" alt="Portfolio Tracker Icon" />
                    <span>Portfolio</span>
                </button>
                <button className="movies-btn">
                    <img src="src/assets/movie.svg" alt="Movie Tracker Icon" />
                    <span>Movies</span>
                </button>
            </div>
        </nav>
    )
}

