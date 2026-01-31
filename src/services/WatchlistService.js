import { doc, setDoc, deleteDoc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const addToWatchlist = async (movie) => {
  try {
    await setDoc(doc(db, "watchlist", movie.imdbID.toString()), {
      id: movie.imdbID, // imdbID as the document ID
      title: movie.Title,
      rating: movie.imdbRating,
      poster: movie.Poster,
      duration: movie.Runtime,
      genres: movie.Genre,
      description: movie.Plot,
      hasWatched: false,
      addedAt: new Date().toISOString()
    });
    console.log("Added to watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist:", error);
  }
};


export const removeFromWatchlist = async (movieId) => {
  try {
    await deleteDoc(doc(db, "watchlist", movieId.toString()));
    console.log("Removed from watchlist!");
  } catch (error) {
    console.error("Error removing from watchlist:", error);
  }
};



export const getWatchlist = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "watchlist"));
    const watchlist = [];
    querySnapshot.forEach((doc) => {
      watchlist.push(doc.data());
    });
    // Sort by hasWatched (false first, then true)
    return watchlist.sort((a, b) => a.hasWatched - b.hasWatched);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};

export const markAsWatched = async (movieId) => {
  try {
    const movieRef = doc(db, "watchlist", movieId.toString());
    await setDoc(movieRef, { hasWatched: true }, { merge: true });
    console.log("Marked as watched!");
  } catch (error) {
    console.error("Error marking as watched:", error);
  }
};

export const markAsUnwatched = async (movieId) => {
  try {
    const movieRef = doc(db, "watchlist", movieId.toString());
    await setDoc(movieRef, { hasWatched: false }, { merge: true });
    console.log("Marked as unwatched!");
  } catch (error) {
    console.error("Error marking as unwatched:", error);
  }
};

export const movieInWatchlist = async (movieId) => {
  try {
    const movieRef = doc(db, "watchlist", movieId.toString());
    const movieSnap = await getDoc(movieRef);
    return movieSnap.exists();
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};