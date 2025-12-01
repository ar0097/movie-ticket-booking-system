"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Movies.css";
// import { Link } from "react-router-dom";
import { getMovies } from "../../api";
import Link from "next/link";

interface MoviesTypes {
  title: string;
  _id: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  showtimes: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}
function Movies() {
  const [movies, setMovies] = useState<MoviesTypes[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      setFilterData(data);
    });
  }, []);

  useEffect(() => {
    const filtered = filterData.filter((ele: MoviesTypes) =>
      ele.title.toLowerCase().includes(searchTerm)
    );
    setMovies(filtered);
  }, [filterData, searchTerm]);
  return (
    <div className="movies">
      <Navbar />
      <div className="movies-container">
        <div className="search-movies">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="movies-cards">
          {movies.map((ele, i) => (
            <div className="movies-card" key={i}>
              <img src={ele.image} alt={ele.title} className="movies-image" />
              <div style={{ padding: "16px" }}>
                <h1 className="movies-title">{ele.title}</h1>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#a6a6a6",
                    marginBottom: "8px",
                  }}
                >
                  {ele.genre}
                </p>
                <div className="movies-time">
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#a6a6a6",
                    }}
                  >
                    {ele.duration}
                  </span>
                  <span
                    style={{
                      background: "#e7b008",
                      color: "#1a212d",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: "700",
                    }}
                  >
                    ⭐ {ele.rating}
                  </span>
                </div>
                <Link href={`/booking/${ele._id}`}>
                  <button className="movies-book-button">Book Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
