import Axios from "axios";
import { types, flow } from "mobx-state-tree";
import { createContext } from "react";

const MovieStore = types
  .model("Movie", {
    _id: "",
    title: "",
    year: 0,
    rating: "",
    refresh: "",
    update: true,
  })
  .actions((self) => ({
    setMovie(id, title, year, rating) {
      self._id = id;
      self.title = title;
      self.year = year;
      self.rating = rating;
    },
    updateToggle() {
      self.update = !self.update;
    },
  }));

const WindowStore = types
  .model("Window", {
    addNewOpen: false,
    updateOpen: false,
  })
  .actions((self) => ({
    openAddNew() {
      self.addNewOpen = true;
    },
    closeAddNew() {
      self.addNewOpen = false;
    },
    openUpdate() {
      self.updateOpen = true;
    },
    closeUpdate() {
      self.updateOpen = false;
    },
  }));

const UserStore = types
  .model("User", {
    userPosition: "",
    managerPassword: "1234",
    manager2Password: "1234",
  })
  .actions((self) => ({
    setUserPosition(userPosition) {
      self.userPosition = userPosition;
    },
    checkLogin(position, password) {
      if (position === "MANAGER" && password === "1234") return true;
      if (position === "TEAMLEADER" && password === "1234") return true;
      if (position === "FLOORSTAFF" && password === "1234") return true;
    },
  }));

const storeWindow = WindowStore.create({});
const storeMovie = MovieStore.create({});

export const windowContext = createContext(storeWindow);
export const movieContext = createContext(storeMovie);
export const userContext = createContext(UserStore.create({}));
