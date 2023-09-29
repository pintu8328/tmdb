import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../components/SearchInput";

describe("SearchInput Component", () => {
  test("renders input field and calls handleSearch on change", () => {
    // Mocking the handleSearch function
    const mockHandleSearch = jest.fn();

    // Render the SearchInput component with mock data
    render(<SearchInput searchKeyword="Star Wars" handleSearch={mockHandleSearch} />);

    // Check if the input field is rendered with the correct placeholder and value
    const inputElement = screen.getByPlaceholderText("Movies, shows and more");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Star Wars");

    // Simulate a change in the input value
    fireEvent.change(inputElement, { target: { value: "Harry Potter" } });

    // Check if the handleSearch function is called with the updated value
    expect(mockHandleSearch).toHaveBeenCalledWith("Harry Potter");
  });
});
