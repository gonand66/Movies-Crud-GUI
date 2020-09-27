import React, { useState, useContext } from "react";
import Axios from "axios";
import { movieContext, windowContext } from "../stores/store";

export default function Update() {
  const { closeUpdate } = useContext(windowContext);
  const { title, _id, year, rating, updateToggle } = useContext(movieContext);

  const [newTitle, setNewTitle] = useState(title);
  const [newYear, setNewYear] = useState(year);
  const [newRating, setNewRating] = useState(rating);

  const movieUpdate = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      title: newTitle,
      year: newYear,
      rating: newRating,
    });
    const res = await Axios.put(
      "http://localhost:7000/api/movies/" + _id,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert(res.data.message);
    setNewTitle("");
    setNewYear("");
    setNewRating("");
    closeUpdate();
    updateToggle();
  };

  return (
    <div className="add-window">
      <div className="pop-up">
        <form onSubmit={movieUpdate} id="update-form">
          <h2 onClick={closeUpdate}>X</h2>
          <p> Update </p>
          <input
            type="text"
            placeholder="title..."
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="year released..."
            value={newYear}
            onChange={(e) => {
              setNewYear(e.target.value);
            }}
          />
          <div className="rating">
            Rating
            <select
              name="rating"
              value={newRating}
              onChange={(e) => {
                setNewRating(e.target.value);
              }}
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="M">M</option>
              <option value="MA">MA</option>
              <option value="R">R</option>
            </select>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
