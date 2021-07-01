import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./cssfile/row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  //
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    //if [] , run once when the row loads and don't run again
    //if [variable] , run every singlie time variable changes
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      //video is already open
      setTrailerUrl(""); //to hide the video
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=B-kxUMHBxNo&ab_channel=CleverProgrammer
          //get everything after the questionmark
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v")); //v의 오른쪽값 추출
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      {/*title*/}
      <h2>{title}</h2>
      <div className="row__posters">
        {/*several row__poster(s) */}
        {movies.map((movie) => (
          //"*****.jpg"
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {/*con tainer -> posters */}
    </div>
  );
}

export default Row;
