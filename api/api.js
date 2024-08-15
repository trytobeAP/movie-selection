const url = "https://e88d35421726e038.mokky.dev";

export async function fetchData() {
  try {
    const response = await fetch(`${url}/films`);
    const data = await response.json();

    return data[0].docs;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchFavoriteFilmsID() {
  try {
    const response = await fetch(`${url}/favoriteFilmsID`);
    const favoriteFilmsID = await response.json();

    const dataFavoriteFilmsID = favoriteFilmsID.map(
      (element) => element.favoriteFilmID
    );

    return dataFavoriteFilmsID;
  } catch (error) {
    console.error("Error fetching fetchFavoriteFilmsID: ", error);
  }
}

export async function fetchFavoriteFilms() {
  try {
    const response = await fetch(`${url}/favoriteFilms`);
    const favoriteFilms = await response.json();
    const dataFavoriteFilms = favoriteFilms.map(
      (element) => element.favoriteFilm
    );

    return dataFavoriteFilms;
  } catch (error) {
    console.error("Error fetching fetchFavoriteFilms: ", error);
  }
}

export async function getApi_Id_ByFavoriteFilmID(favoriteFilmID) {
  try {
    const response = await fetch(`${url}/favoriteFilmsID`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const film = data.find((item) => item.favoriteFilmID === favoriteFilmID);

    if (!film) {
      throw new Error("Film not found");
    }

    return film.id;
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}

export async function getApi_FilmId_ByFavoriteFilmID(favoriteFilmID) {
  try {
    const response = await fetch(`${url}/favoriteFilms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const film = data.find(
      (item) => item.favoriteFilm.externalId._id === favoriteFilmID
    );

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}

export async function fetchRatedFilmsID() {
  try {
    const response = await fetch(`${url}/ratedFilmsID`);
    const ratedFilmsID = await response.json();

    const dataRatedFilmsID = ratedFilmsID.map((element) => element.ratedFilmID);

    return dataRatedFilmsID;
  } catch (error) {
    console.error("Error fetching rated films ID: ", error);
  }
}

export async function fetchRatedFilms() {
  try {
    const responseRatedFilms = await fetch(`${url}/ratedFilms`);
    const ratedFilms = await responseRatedFilms.json();

    const dataRatedFilms = ratedFilms.map((element) => element.ratedFilm);

    return dataRatedFilms;
  } catch (error) {
    console.error("Error fetching rated films: ", error);
  }
}

export async function fetchRatesAndIdsFilms() {
  try {
    const response = await fetch(`${url}/ratesAndIdsFilms`);
    const ratesAndIdsFilms = await response.json();
    return ratesAndIdsFilms;
  } catch (error) {
    console.error("Error fetching rates and IDs films: ", error);
  }
}

export async function getApi_Id_ByRatedFilmID(ratedFilmID) {
  try {
    const response = await fetch(`${url}/ratedFilmsID`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const film = data.find((item) => item.ratedFilmID === ratedFilmID);

    if (!film) {
      throw new Error("Film not found");
    }

    return film.id;
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}

export async function getApi_FilmId_ByRatedFilmID(ratedFilmID) {
  try {
    const response = await fetch(`${url}/ratedFilms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const film = data.find(
      (item) => item.ratedFilm.externalId._id === ratedFilmID
    );

    if (!film) {
      throw new Error("Film not found");
    }
    return film.id;
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}

export async function getApi_IDofRatesAndIds_ByRatedFilmID(ratedFilmID) {
  try {
    const response = await fetch(`${url}/ratesAndIdsFilms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const film = data.find((item) => Object.keys(item)[0] === ratedFilmID);

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}
