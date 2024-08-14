import { defineStore } from "pinia";
import {
  fetchData,
  fetchFavoriteFilmsID,
  fetchFavoriteFilms,
  fetchRatedFilms,
  fetchRatedFilmsID,
  fetchRatesAndIdsFilms,
} from "../../api/api.js";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [],
    favoriteFilms: [],
    favoriteFilmsID: [],

    ratedFilms: [],
    ratedFilmsID: [],
    ratesAndIdsFilms: [],
    rating: 0,
    ratingLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentFilm: {},
    _id: "",
    sortByYear: "Не выбрано",
    sortByRating: "Не выбрано",
    sortByMovieLength: "Не выбрано",
  }),

  getters: {
    async getDataToStore() {
      this.films = await fetchData();
      this.favoriteFilmsID = await fetchFavoriteFilmsID();
      this.favoriteFilms = await fetchFavoriteFilms();
      this.ratedFilms = await fetchRatedFilms();
      this.ratedFilmsID = await fetchRatedFilmsID();
      this.ratesAndIdsFilms = await fetchRatesAndIdsFilms();
    },

    getRatingOfCurrentFilmLoaded() {
      const foundObj = this.ratesAndIdsFilms.find((obj) => obj[this._id]);
      if (foundObj) {
        this.rating = foundObj[this._id];
      }
    },
  },

  actions: {
    async setCurrentFilm(value) {
      Object.assign(this.currentFilm, value);
    },

    setCurrentFilmById(_id) {
      const currentFilmById = this.films.find((f) => f.externalId._id === _id);
      if (currentFilmById) {
        Object.assign(this.currentFilm, currentFilmById);
      }
    },

    async addToFavorite() {
      if (!this.favoriteFilmsID.includes(this._id)) {
        this.favoriteFilmsID.unshift(this.currentFilm.externalId._id);

        try {
          const response = await fetch(
            "https://62972ac33b7d16bd.mokky.dev/favoriteFilmsID",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ favoriteFilmID: this._id }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error updating favoriteFilmsID:", error);
        }
      }

      if (!this.favoriteFilms.some((f) => f.externalId._id === this._id)) {
        const filmToAddToFav = this.films.find(
          (f) => f.externalId._id === this._id
        );

        if (filmToAddToFav) {
          this.favoriteFilms.unshift(filmToAddToFav);
        }

        try {
          const response = await fetch(
            "https://62972ac33b7d16bd.mokky.dev/favoriteFilms",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ favoriteFilm: filmToAddToFav }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error updating favoriteFilms:", error);
        }
      }
    },

    removeFromFavorite() {
      if (this.favoriteFilmsID.includes(this._id)) {
        this.favoriteFilmsID = this.favoriteFilmsID.filter(
          (_id) => _id !== this._id
        );

        localStorage.setItem(
          "favoriteFilmsID",
          JSON.stringify(this.favoriteFilmsID)
        );

        this.favoriteFilms = this.favoriteFilms.filter(
          (f) => f.externalId._id !== this._id
        );

        localStorage.setItem(
          "favoriteFilms",
          JSON.stringify(this.favoriteFilms)
        );
      }
    },

    addToRated() {
      this.ratedFilmsID.unshift(this.currentFilm.externalId._id);

      this.ratesAndIdsFilms.unshift({ [this._id]: this.rating });

      localStorage.setItem(
        "ratesAndIdsFilms",
        JSON.stringify(this.ratesAndIdsFilms)
      );
      localStorage.setItem("ratedFilmsID", JSON.stringify(this.ratedFilmsID));

      if (!this.ratedFilms.some((f) => f.externalId._id === this._id)) {
        const filmToAdd = this.films.find((f) => f.externalId._id === this._id);
        if (filmToAdd) {
          this.ratedFilms.unshift(filmToAdd);
        }

        localStorage.setItem("ratedFilms", JSON.stringify(this.ratedFilms));
      }
    },

    removeFromRated() {
      if (this.ratedFilmsID.includes(this._id)) {
        this.ratedFilmsID = this.ratedFilmsID.filter((_id) => _id !== this._id);
        localStorage.setItem("ratedFilmsID", JSON.stringify(this.ratedFilmsID));

        this.ratedFilms = this.ratedFilms.filter(
          (f) => f.externalId._id !== this._id
        );
        localStorage.setItem("ratedFilms", JSON.stringify(this.ratedFilms));

        this.ratesAndIdsFilms = this.ratesAndIdsFilms.filter(
          (obj) => Object.keys(obj) != this._id
        );
        localStorage.setItem(
          "ratesAndIdsFilms",
          JSON.stringify(this.ratesAndIdsFilms)
        );
      }
    },
  },
});
