import Axios from "axios";
import React, { useContext } from "react";
import { movieContext, userContext, windowContext } from "../stores/store";

export default function Movie({ title, year, rating, id }) {
  const { openUpdate } = useContext(windowContext);
  const { userPosition } = useContext(userContext);
  const { updateToggle, setMovie } = useContext(movieContext);

  const deleteMovie = async () => {
    const res = await Axios.delete("http://localhost:7000/api/movies/" + id);
    alert(res.data.message);
    updateToggle()
  };

  const clickUpdate = () => {
    openUpdate();
    setMovie(id, title, year, rating);
  };

  return (
    <div>
      <div className="movie">
        <div>{title}</div>
        <div>{year}</div>
        <div>{rating}</div>
        <div>
          <button id="update-btn" onClick={clickUpdate}>
            Update
          </button>
          {userPosition === "MANAGER" && (
            <button id="delete-btn" onClick={deleteMovie}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
