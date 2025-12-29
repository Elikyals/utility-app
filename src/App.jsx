import { useState } from 'react'
import './styles/App.css'
import Home from './components/Home.jsx'
import Randomizer from './components/Randomizer.jsx'
import LeetCodeTracker from './components/LeetCodeTracker.jsx'
import Portfolio from './components/Portfolio.jsx'
import Movies from './components/Movies.jsx'
import Nav from './components/Navigation.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'randomizer':
        return <Randomizer />
      case 'lt-tracker':
        return <LeetCodeTracker />
      case 'portfolio':
        return <Portfolio />
      case 'movies':
        return <Movies />
      default:
        return <Home />
    }
  }

  return (
    <>
      <div className='main-container'>
        <Nav currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className='main-content'>
          {renderPage()}
        </main>
      </div>
    </>
  )
}

export default App
