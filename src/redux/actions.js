import axios from "axios";
import * as actionTypes from "./actionTypes";

const apiKey = "7e6305cf2452143ea17d196b3e7fe7bc";

// Action creators

export const setMovies = (movies) => ({
  type: actionTypes.SET_MOVIES,
  payload: movies,
});

export const setSearchResults = (results) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload: results,
});

export const setLoading = (loading) => ({
  type: actionTypes.SET_LOADING,
  payload: loading,
});

export const setSearchKeyword = (keyword) => ({
  type: actionTypes.SET_SEARCH_KEYWORD,
  payload: keyword,
});

export const setMovieDetails = (details) => ({
  type: actionTypes.SET_MOVIE_DETAILS,
  payload: details,
});

// Async action creator for fetching popular movies

export const fetchMovies = () => async (dispatch) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  try {
    dispatch(setLoading(true)); // Set loading state to true
    const response = await axios.get(apiUrl);
    dispatch(setLoading(false)); // Set loading state to false after fetching data
    dispatch(setMovies(response.data.results)); // Set movies in the state
    dispatch(setSearchResults(response.data.results)); // Set search results in the state
  } catch (error) {
    console.error("Error fetching data: ", error);
    dispatch(setLoading(false)); // Set loading state to false in case of an error
  }
};

// Async action creator for searching movies by keyword

export const fetchMoviesByKeyword = (keyword) => async (dispatch) => {
  if (keyword.trim() !== "") {
    try {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
      const response = await axios.get(apiUrl);
      dispatch(setSearchResults(response.data.results)); // Set search results in the state
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  } else {
    dispatch(setSearchResults([])); // If the keyword is empty, clear search results
  }
};

// Async action creator for fetching movie details

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );

    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    );

    dispatch(
      setMovieDetails({
        movieDetails: movieResponse.data, // Set movie details in the state
        videos: videoResponse.data.results, // Set videos in the state
      })
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
