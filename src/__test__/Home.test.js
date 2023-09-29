import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../pages/Home";

// Mock Redux store
const mockStore = configureStore([]);

describe("Home Component", () => {
  test("renders component and handles search input", () => {
    // Mock Redux store state
    const initialState = {
      data: [],
      loading: false,
      searchKeyword: "",
      searchResults: [],
    };

    const store = mockStore(initialState);

    // Render the Home component with the mock store
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if the search input is rendered
    const inputElement = screen.getByPlaceholderText("Movies, shows and more");
    expect(inputElement).toBeInTheDocument();

    // Simulate a change in the search input value
    fireEvent.change(inputElement, { target: { value: "Harry Potter" } });

    // Check if the Redux actions are dispatched correctly
    const actions = store.getActions();
    expect(actions).toHaveLength(2); // fetchMovies and fetchMoviesByKeyword

    // Check if the loading skeleton is not rendered when not loading
    const skeletonElement = screen.queryByTestId("loading-skeleton");
    expect(skeletonElement).toBeNull();
  });

  test("renders loading skeleton when loading", () => {
    // Mock Redux store state with loading true
    const initialState = {
      data: [],
      loading: true,
      searchKeyword: "",
      searchResults: [],
    };

    const store = mockStore(initialState);

    // Render the Home component with the mock store
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if the loading skeleton is rendered
    const skeletonElement = screen.getByTestId("loading-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });
});
