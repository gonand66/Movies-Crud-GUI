import React, { useState, useContext } from "react";
import { userContext } from "../stores/store";

export default function Login({ closeAddNew }) {
  const { checkLogin, setUserPosition } = useContext(userContext);

  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("MANAGER");

  const handlerSubmit = (e) => {
    e.preventDefault();
    checkLogin(position, password)
      ? setUserPosition(position)
      : alert("Password is wrong");
    setPassword("");
    setPosition("MANAGER");
  };

  return (
    <div className="login">
      <form onSubmit={handlerSubmit}>
        <h1> Login </h1>
        <select
          className="user-position"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        >
          <option value="MANAGER">MANAGER</option>
          <option value="TEAMLEADER">TEAMLEADER</option>
          <option value="FLOORSTAFF">FLOORSTAFF</option>
        </select>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>password for all position : 1234</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
