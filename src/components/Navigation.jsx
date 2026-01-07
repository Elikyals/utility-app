import '../styles/Navigation.css'
import { ColoredLine } from './divider'
import { useState, useEffect } from 'react'
import logo from '../assets/utility logo.png'
import person from '../assets/person.svg'
import HomeIcon from '../assets/home.svg?react'
import DiceIcon from '../assets/dice.svg?react'
import CodeIcon from '../assets/code.svg?react'
import PortfolioIcon from '../assets/portfolio.svg?react'
import MovieIcon from '../assets/movie.svg?react'

export default function Nav({currentPage, onPageChange}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <nav>
            <div className='app-logo'>
                <img src={logo} alt='logo' />
                <h1>xUTILITIES</h1>
                {isMobile && <img src={person} alt='person icon'/>}
            </div>
            {!isMobile && <ColoredLine width="90%" />}
            <div className='nav-btn'>
                <button 
                    className={`home-btn ${currentPage === 'home'? 'active': ''}`}
                    onClick={() => onPageChange('home')}>
                    <HomeIcon className='icon' />
                    <span>Home</span>
                </button>
                <button className={`randomize-btn ${currentPage === 'randomizer'? 'active': ''}`}
                    onClick={() => onPageChange('randomizer')}>
                    <DiceIcon className='icon' />
                    <span>Randomize</span>
                </button>
                <button className={`lt-tracker-btn ${currentPage === 'lt-tracker'? 'active': ''}`}
                    onClick={() => onPageChange('lt-tracker')}>
                    <CodeIcon className='icon' />
                    <span>{isMobile? "LT Tracker": "LeetCode Tracker"}</span>
                </button>
                <button className={`portfolio-btn ${currentPage === 'portfolio'? 'active': ''}`}
                    onClick={() => onPageChange('portfolio')}>
                    <PortfolioIcon className='icon' />
                    <span>Portfolio</span>
                </button>
                <button className={`movies-btn ${currentPage === 'movies'? 'active': ''}`}
                    onClick={() => onPageChange('movies')}>
                    <MovieIcon className='icon' />
                    <span>Movies</span>
                </button>
            </div>
        </nav>
    )
}

