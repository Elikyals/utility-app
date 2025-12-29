import '../styles/Navigation.css'
import { ColoredLine } from './divider'
import { useState, useEffect } from 'react'
import logo from '../assets/utility logo.png'
import person from '../assets/person.svg'
import home from '../assets/home.svg'
import dice from '../assets/dice.svg'
import code from '../assets/code.svg'
import portfolio from '../assets/portfolio.svg'
import movie from '../assets/movie.svg'

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
                    <img src={home} alt="Home Icon" />
                    <span>Home</span>
                </button>
                <button className={`randomize-btn ${currentPage === 'randomizer'? 'active': ''}`}
                    onClick={() => onPageChange('randomizer')}>
                    <img src={dice} alt="Randomize Icon" />
                    <span>Randomize</span>
                </button>
                <button className={`lt-tracker-btn ${currentPage === 'lt-tracker'? 'active': ''}`}
                    onClick={() => onPageChange('lt-tracker')}>
                    <img src={code} alt="Leetcode Tracker Icon" />
                    <span>{isMobile? "LT Tracker": "LeetCode Tracker"}</span>
                </button>
                <button className={`portfolio-btn ${currentPage === 'portfolio'? 'active': ''}`}
                    onClick={() => onPageChange('portfolio')}>
                    <img src={portfolio} alt="Portfolio Tracker Icon" />
                    <span>Portfolio</span>
                </button>
                <button className={`movies-btn ${currentPage === 'movies'? 'active': ''}`}
                    onClick={() => onPageChange('movies')}>
                    <img src={movie} alt="Movie Tracker Icon" />
                    <span>Movies</span>
                </button>
            </div>
        </nav>
    )
}

