import * as actionTypes from "./actionTypes";

// Initial state for the reducer
const initialState = {
  data: [], // Array to store movie data
  loading: true, // Loading state
  searchKeyword: "", // Keyword for movie search
  searchResults: [], // Array to store search results
  movieDetails: null, // Object to store details of a specific movie
  selectedVideos: [], // Array to store keys of selected videos
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES:
      // Set movie data in the state
      return { ...state, data: action.payload };
    case actionTypes.SET_SEARCH_RESULTS:
      // Set search results in the state
      return { ...state, searchResults: action.payload };
    case actionTypes.SET_LOADING:
      // Set loading state in the state
      return { ...state, loading: action.payload };
    case actionTypes.SET_SEARCH_KEYWORD:
      // Set search keyword in the state
      return { ...state, searchKeyword: action.payload };
    case actionTypes.SET_MOVIE_DETAILS:
      // Set movie details and selected videos in the state
      return {
        ...state,
        movieDetails: action.payload.movieDetails,
        selectedVideos: action.payload.videos.map((video) => video.key),
      };
    default:
      // Return the current state if the action type is not recognized
      return state;
  }
};

export default reducer;
