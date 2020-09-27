import React, { useState,useContext } from "react";
import Axios from "axios"
import { movieContext, windowContext } from "../stores/store";

export default function AddNew() {
  const {closeAddNew} = useContext(windowContext);
  const {updateToggle } = useContext(movieContext);

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [rating, setRating] = useState("G")

  const moviePost = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
        title: title,
        year: year,
        rating: rating,
      });
      const res = await Axios.post("http://localhost:7000/api/movies/add", body, {
        headers: {
        "Content-Type": "application/json",
      }
    });
    alert(res.data.message)
    setTitle("")
    setYear("")
    setRating("")
    updateToggle()
  };

  return (
    <div className="add-window">
      <div className="pop-up">
        <form  onSubmit={moviePost} id="add-form">
          <h2 onClick={closeAddNew}>X</h2>
          <p> Add New </p>
          <input
            type="text"
            placeholder="title..."
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          <input
            type="number"
            placeholder="year released..."
            value={year}
            onChange={(e)=>{setYear(e.target.value)}}
          />
          <div className="rating"  >
            Rating
            <select name="rating" value={rating} onChange={(e)=>{setRating(e.target.value)}}>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="M">M</option>
              <option value="MA">MA</option>
              <option value="R">R</option>
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
