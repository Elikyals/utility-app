import  Nav from "./Navigation.jsx"
import '../styles/Randomizer.css'

export default function Randomizer(){
    return (
        <>
        <div className="container">
            <Nav/>
            <section className="playground">
                <h2>Pick Your Challenge</h2>
                <button>Shuffle Project</button>
                <div className="display-screen">
                    <img src="src/assets/bulb.svg" />
                    <p>Click shuffle to get a random project Challenge</p>
                </div>
            </section>
        </div>
        </>
    )
}