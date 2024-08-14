export async function fetchData() {
  try {
    const responseFilms = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/films"
    );
    const data = await responseFilms.json();

    return data[0].docs;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export async function fetchFavoriteFilmsID() {
  try {
    const responseFavoriteFilmsID = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/favoriteFilmsID"
    );
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
    const responseFavoriteFilms = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/favoriteFilms"
    );
    const favoriteFilms = await responseFavoriteFilms.json();
    const dataFavoriteFilms = favoriteFilms.map((element) => {
      console.log(`element["favoriteFilm"] - ${element["favoriteFilm"]}`);
      return element["favoriteFilm"];
    });

    console.log("dataFavoriteFilms"); //
    console.log(dataFavoriteFilms); //

    return dataFavoriteFilms;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}

export async function fetchRatedFilms() {
  try {
    const ratedFilms = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/ratedFilms"
    );
    const dataRatedFilms = await ratedFilms.json();
    return dataRatedFilms[0];
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}

export async function fetchRatedFilmsID() {
  try {
    const ratedFilmsID = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/ratedFilmsID"
    );
    const dataRatedFilmsID = await ratedFilmsID.json();
    return dataRatedFilmsID;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}

export async function fetchRatesAndIdsFilms() {
  try {
    const ratesAndIdsFilms = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/ratedFilmsID"
    );
    const dataRatesAndIdsFilms = await ratesAndIdsFilms.json();
    return dataRatesAndIdsFilms;
  } catch (error) {
    console.error("Error fetching fectchFavoriteFilms: ", error);
  }
}
