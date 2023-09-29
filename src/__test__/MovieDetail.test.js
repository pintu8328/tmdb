import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route } from "react-router-dom";
import MovieDetail from "./MovieDetail";

// Mock Redux store
const mockStore = configureStore([]);

describe("MovieDetail Component", () => {
  test("renders component and fetches movie details", async () => {
    // Mock Redux store state
    const initialState = {
      movieDetails: {
        id: 123,
        title: "Movie Title",
        release_date: "2022-01-01",
        overview: "This is a movie overview.",
        vote_average: 7.5,
        vote_count: 100,
        poster_path: "/poster.jpg",
      },
      selectedVideos: ["videoKey1", "videoKey2"],
    };

    const store = mockStore(initialState);

    // Mock useParams with the movie ID
    const useParamsMock = jest.fn();
    useParamsMock.mockReturnValue({ id: "123" });

    // Render the MovieDetail component with the mock store and mocked useParams
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/123"]}>
          <Route path="/movies/:id">
            <MovieDetail />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    // Check if the movie details are rendered
    const titleElement = screen.getByText("Movie Title");
    expect(titleElement).toBeInTheDocument();

    const releaseDateElement = screen.getByText("Release Date: 2022-01-01");
    expect(releaseDateElement).toBeInTheDocument();

    const overviewElement = screen.getByText("Overview: This is a movie overview.");
    expect(overviewElement).toBeInTheDocument();

    const ratingElement = screen.getByText("Average rating: 7.5");
    expect(ratingElement).toBeInTheDocument();

    const voteCountElement = screen.getByText("vote_count: 100");
    expect(voteCountElement).toBeInTheDocument();

    // Wait for YouTube player to render (or Skeleton loading component)
    await waitFor(() => {
      const videoElement = screen.getByTestId("youtube-player");
      expect(videoElement).toBeInTheDocument();
    });
  });
});
