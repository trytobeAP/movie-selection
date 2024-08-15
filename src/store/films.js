import { defineStore } from "pinia";
import {
  fetchData,
  fetchFavoriteFilmsID,
  fetchFavoriteFilms,
  getApi_Id_ByFavoriteFilmID,
  getApi_FilmId_ByFavoriteFilmID,
  fetchRatedFilms,
  fetchRatedFilmsID,
  fetchRatesAndIdsFilms,
  getApi_Id_ByRatedFilmID,
  getApi_FilmId_ByRatedFilmID,
  getApi_IDofRatesAndIds_ByRatedFilmID,
} from "../../api/api.js";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    url: "https://e88d35421726e038.mokky.dev",
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
          const response = await fetch(`${this.url}/favoriteFilmsID`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ favoriteFilmID: this._id }),
          });

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
          const response = await fetch(`${this.url}/favoriteFilms`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ favoriteFilm: filmToAddToFav }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error updating favoriteFilms:", error);
        }
      }
    },

    async removeFromFavorite() {
      if (this.favoriteFilmsID.includes(this._id)) {
        this.favoriteFilmsID = this.favoriteFilmsID.filter(
          (_id) => _id !== this._id
        );

        const idOnApiToDelFromFav_IDs = await getApi_Id_ByFavoriteFilmID(
          this._id
        );

        try {
          const response = await fetch(
            `${this.url}/favoriteFilmsID/${idOnApiToDelFromFav_IDs}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error deleting favoriteFilmID:", error);
        }

        this.favoriteFilms = this.favoriteFilms.filter(
          (f) => f.externalId._id !== this._id
        );

        const idOnApiToDelFromFav_Films = await getApi_FilmId_ByFavoriteFilmID(
          this._id
        );

        try {
          const response = await fetch(
            `${this.url}/favoriteFilms/${idOnApiToDelFromFav_Films}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error deleting favoriteFilm:", error);
        }
      }
    },

    async addToRated() {
      this.ratedFilmsID.unshift(this.currentFilm.externalId._id);

      this.ratesAndIdsFilms.unshift({ [this._id]: this.rating });

      try {
        const response = await fetch(`${this.url}/ratedFilmsID`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ratedFilmID: this._id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error updating ratedFilmsID:", error);
      }

      try {
        const response = await fetch(`${this.url}/ratesAndIdsFilms`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [this._id]: this.rating }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error updating ratesAndIdsFilms:", error);
      }

      if (!this.ratedFilms.some((f) => f.externalId._id === this._id)) {
        const filmToAdd = this.films.find((f) => f.externalId._id === this._id);
        if (filmToAdd) {
          this.ratedFilms.unshift(filmToAdd);
        }

        try {
          const response = await fetch(`${this.url}/ratedFilms`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ratedFilm: filmToAdd }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error updating ratedFilms:", error);
        }
      }
    },

    async removeFromRated() {
      if (this.ratedFilmsID.includes(this._id)) {
        this.ratedFilmsID = this.ratedFilmsID.filter((_id) => _id !== this._id);

        const idOnApiToDelFromRated_IDs = await getApi_Id_ByRatedFilmID(
          this._id
        );

        try {
          const response = await fetch(
            `${this.url}/ratedFilmsID/${idOnApiToDelFromRated_IDs}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error deleting ratedFilmID:", error);
        }

        this.ratedFilms = this.ratedFilms.filter(
          (f) => f.externalId._id !== this._id
        );

        const idOnApiToDelFromRated_Films = await getApi_FilmId_ByRatedFilmID(
          this._id
        );

        try {
          const response = await fetch(
            `${this.url}/ratedFilms/${idOnApiToDelFromRated_Films}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error deleting ratedFilm:", error);
        }

        this.ratesAndIdsFilms = this.ratesAndIdsFilms.filter(
          (obj) => Object.keys(obj)[0] !== this._id
        );

        const idOnApiToDelFrom_RatesAndIds =
          await getApi_IDofRatesAndIds_ByRatedFilmID(this._id);

        try {
          const response = await fetch(
            `${this.url}/ratesAndIdsFilms/${idOnApiToDelFrom_RatesAndIds}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error deleting ratesAndIdsFilms:", error);
        }
      }
    },
  },
});
