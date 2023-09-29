import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Skeleton from "../components/Skeleton";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../redux/actions.js";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get relevant state variables from the Redux store
  const { movieDetails, selectedVideos } = useSelector((state) => state);

  // State to track if the YouTube player is ready
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Fetch movie details on component mount
  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  // If movie details are not available yet, display a loading message
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <VStack align="start" spacing={4} p={4} background={"black"}>
      {/* Movie poster */}
      <Box w={"100%"} h={"400"}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt="Movie Poster"
          w={"100%"}
          h={"100%"}
        />
      </Box>

      {/* Movie details */}
      <Box>
        <Heading color="white">{movieDetails.title}</Heading>
        <Text fontSize="md" color="white">
          Release Date: {movieDetails.release_date}
        </Text>
        <Text fontSize="md" color="white">
          Overview: {movieDetails.overview}
        </Text>
        <Text fontSize="md" color="white">
          Average rating: {movieDetails.vote_average}
        </Text>
        <Text fontSize="md" color="white">
          vote_count: {movieDetails.vote_count}
        </Text>
      </Box>

      {/* Display selected videos if available */}
      {selectedVideos.length > 0 && (
        <Box>
          <Heading size="md" mb={2}>
            Selected Videos
          </Heading>
          {/* Grid of YouTube videos */}
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
            {selectedVideos.map((videoKey) => (
              <Box key={videoKey} mb={4}>
                {/* Render YouTube player when ready, otherwise show a skeleton loading effect */}
                {isPlayerReady ? (
                  <YouTube videoId={videoKey} opts={{ width: "100%" }} />
                ) : (
                  <Skeleton />
                )}
                {/* Initialize YouTube player and set isPlayerReady to true when ready */}
                <YouTube
                  videoId={videoKey}
                  opts={{ width: "100%" }}
                  onReady={() => setIsPlayerReady(true)}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
};

export default MovieDetail;
