// __tests__/actions.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../path-to-actions/actions'; // Adjust the path based on your project structure
import * as actionTypes from '../path-to-actions/actionTypes'; // Adjust the path based on your project structure

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('creates SET_MOVIES and SET_SEARCH_RESULTS when fetching movies has been done', () => {
    const expectedMovies = [{ id: 1, title: 'Movie 1' }];
    const store = mockStore({ movies: [], searchResults: [] });
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=7e6305cf2452143ea17d196b3e7fe7bc';

    mockAxios.onGet(apiUrl).reply(200, { results: expectedMovies });

    const expectedActions = [
      { type: actionTypes.SET_LOADING, payload: true },
      { type: actionTypes.SET_LOADING, payload: false },
      { type: actionTypes.SET_MOVIES, payload: expectedMovies },
      { type: actionTypes.SET_SEARCH_RESULTS, payload: expectedMovies },
    ];

    return store.dispatch(actions.fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_SEARCH_RESULTS when fetching movies by keyword has been done', () => {
    const expectedResults = [{ id: 1, title: 'Movie 1' }];
    const store = mockStore({ searchResults: [] });
    const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=7e6305cf2452143ea17d196b3e7fe7bc&query=test';

    mockAxios.onGet(apiUrl).reply(200, { results: expectedResults });

    const expectedActions = [
      { type: actionTypes.SET_SEARCH_RESULTS, payload: expectedResults },
    ];

    return store.dispatch(actions.fetchMoviesByKeyword('test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_MOVIE_DETAILS when fetching movie details has been done', () => {
    const expectedMovieDetails = { id: 1, title: 'Movie 1' };
    const expectedVideos = [{ key: 'abc123', name: 'Trailer' }];
    const store = mockStore({ movieDetails: null, videos: [] });
    const apiUrlMovie = 'https://api.themoviedb.org/3/movie/1?api_key=7e6305cf2452143ea17d196b3e7fe7bc';
    const apiUrlVideos = 'https://api.themoviedb.org/3/movie/1/videos?api_key=7e6305cf2452143ea17d196b3e7fe7bc';

    mockAxios.onGet(apiUrlMovie).reply(200, expectedMovieDetails);
    mockAxios.onGet(apiUrlVideos).reply(200, { results: expectedVideos });

    const expectedActions = [
      { type: actionTypes.SET_MOVIE_DETAILS, payload: { movieDetails: expectedMovieDetails, videos: expectedVideos } },
    ];

    return store.dispatch(actions.fetchMovieDetails(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
