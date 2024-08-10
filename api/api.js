export async function fetchData() {
  try {
    const response = await fetch("../data/kinopoisk-1.json");

    const data = await response.json();

    data.docs = data.docs.map((item) => {
      return { ...item, isFavorite: false };
    });

    return data.docs;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
