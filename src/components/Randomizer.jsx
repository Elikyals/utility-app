import Nav from "./Navigation.jsx"
import '../styles/Randomizer.css'
import { useState, useEffect } from "react"
import { getActiveChallenges, getRandomChallenge } from "../services/challengeService.js"
import classNames from "classnames"
import bulbIcon from '../assets/bulb.svg'

export default function Randomizer() {
    const [challenges, setChallenges] = useState([])
    const [currentChallenge, setCurrentChallenge] = useState(null)

    useEffect(() => {
        console.log('Firebase Config:', {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        });
        async function loadChallenges() {
            try {
                const data = await getActiveChallenges()
                setChallenges(data)
            } catch (err) {
                throw new Error(err)
            }
        }
        loadChallenges()
    }, [])

    function handleShuffle() {
        const randomChallenge = getRandomChallenge(challenges)
        setCurrentChallenge(randomChallenge)
    }

    return (
        <>
            <div className="container">
                <Nav />
                <section className="playground">
                    <h2>Pick Your Challenge</h2>
                    <button onClick={handleShuffle}>Shuffle Project</button>
                    <div className={classNames("display-screen", {
                        "display-screen--active": currentChallenge,
                        "display-screen--empty": !currentChallenge
                    })}>
                        {
                            currentChallenge ? (
                                <>
                                    <p className="challenge-category">
                                        {currentChallenge.category}
                                    </p>
                                    <h2 className="challenge-technology">
                                        {currentChallenge.technology}
                                    </h2>
                                    <p className="challenge-platform">
                                        {currentChallenge.platform}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <img src={bulbIcon} alt="bulb icon" />
                                    <p>Click shuffle to get a random project Challenge</p>
                                </>
                            )
                        }

                    </div>
                </section>
            </div>
        </>
    )
}