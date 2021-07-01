import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./cssfile/row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  //
  const [movies, setMovies] = useState([]);

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

  console.table(movies);

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
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/*con tainer -> posters */}
    </div>
  );
}

export default Row;
