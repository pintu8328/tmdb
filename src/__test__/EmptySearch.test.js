import React from "react";
import { render, screen } from "@testing-library/react";
import EmptySearch from "../components/EmptySearch";

describe("EmptySearch Component", () => {
  test("renders correctly with search keyword", () => {
    const searchKeyword = "Star Wars";

    render(<EmptySearch searchKeyword={searchKeyword} />);

    // Check if the component renders the search keyword
    const keywordElement = screen.getByText(`Couldn't find "${searchKeyword}"`);
    expect(keywordElement).toBeInTheDocument();

    // Check if the suggestion is rendered
    const suggestionElement = screen.getByText(/Try searching for something else/i);
    expect(suggestionElement).toBeInTheDocument();
  });

  test("renders correctly without search keyword", () => {
    render(<EmptySearch searchKeyword="" />);

    // Check if the component renders a default message
    const defaultMessageElement = screen.getByText("Couldn't find \"\"");
    expect(defaultMessageElement).toBeInTheDocument();

    // Check if the default suggestion is rendered
    const defaultSuggestionElement = screen.getByText(/Try searching for something else/i);
    expect(defaultSuggestionElement).toBeInTheDocument();
  });
});
