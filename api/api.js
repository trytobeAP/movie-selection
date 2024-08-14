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
    const { favoriteFilmsID: dataFavoriteFilmsID } =
      await responseFavoriteFilmsID.json();
    console.log(`dataFavoriteFilmsID is:`); //
    console.log(dataFavoriteFilmsID); //
    dataFavoriteFilmsID.map((element) => {
      const value = element[0];
      console.log(`value - ${value}`);
      return value;
    });
    // console.log(`dataFavoriteFilmsID after mapping - ${dataFavoriteFilmsID}`);
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
    const favoriteFilms = await fetch(
      "https://62972ac33b7d16bd.mokky.dev/favoriteFilms"
    );
    const dataFavoriteFilms = await favoriteFilms.json();
    console.log(dataFavoriteFilms[0]); //
    return dataFavoriteFilms[0];
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
