import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import EmptySearch from "../components/EmptySearch";
import {
  fetchMovies,
  fetchMoviesByKeyword,
  setSearchKeyword,
} from "../redux/actions.js";
import SearchInput from "../components/SearchInput";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  // Get relevant state variables from the Redux store
  const { data, loading, searchKeyword, searchResults } = useSelector(
    (state) => state
  );

  console.log(searchResults);

  // Fetch popular movies on component mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Handle search input change
  const handleSearch = (e) => {
    dispatch(setSearchKeyword(e.target.value));
    dispatch(fetchMoviesByKeyword(e.target.value));
  };

  // Clear search input
  const clearSearch = () => {
    setSearchKeyword("");
  };

  return (
    <Box>
      <Box backgroundColor="black">
        {/* Search input component */}
        <SearchInput
          searchKeyword={searchKeyword}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />

        {/* Movie grid */}
        <SimpleGrid columns={{ sm: 2, md: 4, lg: 6 }} spacing={4}>
          {searchResults.map((item) => (
            <RouterLink key={item.id} to={`/${item.original_title}/${item.id}`}>
              <Box
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="base"
                backgroundColor="white"
                transition="transform 0.3s ease-in-out" // Add a transition for a smoother effect
                _hover={{
                  transform: "scale(1.3)", // Zoom in by 30%
                }}
              >
                {/* Movie poster */}
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={`Poster for ${item.original_title}`}
                  boxSize="200px" // Adjust the size as needed
                />

                {/* Movie details */}
                <VStack spacing={2}>
                  <Text fontWeight="bold">{item.original_title}</Text>
                  {/* Additional movie details can be added here */}
                </VStack>
              </Box>
            </RouterLink>
          ))}
        </SimpleGrid>
      </Box>

      {/* Loading skeleton */}
      {loading && <Skeleton />}

      {/* Display message for empty search results */}
      {searchResults.length === 0 && data.length > 0 && (
        <EmptySearch searchKeyword={searchKeyword} />
      )}
    </Box>
  );
};

export default Home;
