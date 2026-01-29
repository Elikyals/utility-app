import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
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
    return watchlist;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};
