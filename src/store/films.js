import { defineStore } from "pinia";
import { fetchData } from "../../api/api.js";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [],
    favoriteFilms: JSON.parse(localStorage.getItem("favoriteFilms")) || [],
    favoriteFilmsID: JSON.parse(localStorage.getItem("favoriteFilmsID")) || [],
    ratedFilms: JSON.parse(localStorage.getItem("ratedFilms")) || [],
    ratedFilmsID: JSON.parse(localStorage.getItem("ratedFilmsID")) || [],
    ratesAndIdsFilms:
      JSON.parse(localStorage.getItem("ratesAndIdsFilms")) || [],
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

    addToFavorite() {
      if (!this.favoriteFilmsID.includes(this._id)) {
        this.favoriteFilmsID.unshift(this.currentFilm.externalId._id);

        localStorage.setItem(
          "favoriteFilmsID",
          JSON.stringify(this.favoriteFilmsID)
        );
      }

      if (!this.favoriteFilms.some((f) => f.externalId._id === this._id)) {
        const filmToAddToFav = this.films.find(
          (f) => f.externalId._id === this._id
        );

        if (filmToAddToFav) {
          this.favoriteFilms.unshift(filmToAddToFav);
        }

        localStorage.setItem(
          "favoriteFilms",
          JSON.stringify(this.favoriteFilms)
        );
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
