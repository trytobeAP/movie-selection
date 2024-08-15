const url = "https://62972ac33b7d16bd.mokky.dev";
export async function fetchData() {
  try {
    const responseFilms = await fetch(`${url}/films`);
    const data = await responseFilms.json();

    return data[0].docs;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export async function fetchFavoriteFilmsID() {
  try {
    const responseFavoriteFilmsID = await fetch(`${url}/favoriteFilmsID`);
    const favoriteFilmsID = await responseFavoriteFilmsID.json();

    const dataFavoriteFilmsID = favoriteFilmsID.map((element) => {
      return element["favoriteFilmID"];
    });

    if (dataFavoriteFilmsID) {
      return dataFavoriteFilmsID;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilmsID: ", error);
  }
}

export async function fetchFavoriteFilms() {
  try {
    const responseFavoriteFilms = await fetch(`${url}/favoriteFilms`);
    const favoriteFilms = await responseFavoriteFilms.json();
    const dataFavoriteFilms = favoriteFilms.map((element) => {
      return element["favoriteFilm"];
    });

    console.log("dataFavoriteFilms"); //
    console.log(dataFavoriteFilms); //

    return dataFavoriteFilms;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
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

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
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
    const responseRatedFilmsID = await fetch(`${url}/ratedFilmsID`);
    const ratedFilmsID = await responseRatedFilmsID.json();

    const dataRatedFilmsID = ratedFilmsID.map((element) => {
      console.log(`element["ratedFilmID"] - ${element["ratedFilmID"]}`);
      return element["ratedFilmID"];
    });

    return dataRatedFilmsID;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}
export async function fetchRatedFilms() {
  try {
    const responseRatedFilms = await fetch(`${url}/ratedFilms`);
    const ratedFilms = await responseRatedFilms.json();

    const dataRatedFilms = ratedFilms.map((element) => {
      console.log(`element["ratedFilm"] - ${element["ratedFilm"]}`);
      return element["ratedFilm"];
    });

    return dataRatedFilms;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}

// ???????
export async function fetchRatesAndIdsFilms() {
  try {
    const responseRatesAndIdsFilms = await fetch(`${url}/ratesAndIdsFilms`);
    const ratesAndIdsFilms = await responseRatesAndIdsFilms.json();

    console.log(
      `ratesAndIdsFilms[0] in api ===================== ${ratesAndIdsFilms[0]}`
    );

    const dataRatesAndIdsFilms = ratesAndIdsFilms.map((element) => {
      console.log(`element - ${element}`);
      const elemCopy = element;
      console.log(`elemCopy - ${elemCopy}`);
      return element;
    });

    return dataRatesAndIdsFilms;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}

export async function getApi_Id_ByRatedFilmID(ratedFilmID) {
  try {
    const response = await fetch(`${url}/ratedFilmsID`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // ratedFilmID: "6376b9837ad98299ff922212"
    const data = await response.json();
    const film = data.find((item) => item.ratedFilmID === ratedFilmID);

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
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

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}

export async function getApi_RatesAndIds_ByRatedFilmID(ratedFilmID) {
  try {
    const response = await fetch(`${url}/ratesAndIdsFilms`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const film = data.find((item) => item[0] === ratedFilmID);

    if (film) {
      return film.id;
    } else {
      throw new Error("Film not found");
    }
  } catch (error) {
    console.error("Error fetching film ID:", error);
  }
}
