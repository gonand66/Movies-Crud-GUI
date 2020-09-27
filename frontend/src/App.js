import React, { useState, useEffect, useContext } from "react";
import "./App.scss";
import AddNew from "./components/AddNew";
import Movie from "./components/Movie";
import Update from "./components/Update";
import Login from "./components/Login";
import { movieContext, userContext, windowContext } from "./stores/store";
import { observer } from "mobx-react-lite";
import Axios from "axios";

export default observer(function App() {
  const { addNewOpen, updateOpen, openAddNew } = useContext(windowContext);
  const { userPosition, setUserPosition } = useContext(userContext);
  const { update } = useContext(movieContext);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [update]);

  const fetchMovie = async () => {
    const res = await Axios.get("http://localhost:7000/api/movies");
    setMovies(res.data.movies);
    setLoading(false);
  };

  return !userPosition ? (
    <div>
      <Login />
    </div>
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {addNewOpen && <AddNew />}
      {updateOpen && <Update />}

      <nav>
        <div className="logo">MOVIE GUI</div>
        <div className="user-position">
          {userPosition}
          <button
            onClick={() => {
              setUserPosition("");
            }}
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="box">
        <div className="top-container">
          <button onClick={openAddNew}>Add New</button>
          <div className="sort-div">
          </div>
        </div>

        {movies.map((movie) => (
          <Movie
            key={movie._id}
            id={movie._id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
          />
        ))}

      </div>
    </div>
  );
});
