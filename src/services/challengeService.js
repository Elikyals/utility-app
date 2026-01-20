import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

export async function getActiveChallenges() {
    try {
        const q = query(
            collection(db, 'challenges'),
            where('active', '==', true)
        )
        const snapshot = await getDocs(q)
        const challenges = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return challenges
    } catch (error) {
        console.error('Error fetching challenges')
        throw error
    }
}

export function getRandomChallenge(challenges) {
    if (!challenges || challenges.length === 0){
        return null
    }
    const randomIndex = Math.floor(Math.random() * challenges.length)
    return challenges[randomIndex]
}