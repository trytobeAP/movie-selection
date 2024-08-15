<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { useFilmsStore } from "../store/films";
import { storeToRefs } from "pinia";

const filmsStore = useFilmsStore();

const posterUrl = ref("");

const props = defineProps({
  _id: {
    type: String,
    required: true,
  },
});

const isMovieFavorite_btn = ref();
const isMovieRated_btn = ref();

const btnStyles = computed(() => {
  return isMovieFavorite_btn.value ? "yellow" : "white";
});

const { rating } = storeToRefs(filmsStore);

onMounted(async () => {
  await filmsStore.getDataToStore;

  isMovieFavorite_btn.value = filmsStore.favoriteFilmsID.includes(props._id);
  isMovieRated_btn.value = filmsStore.ratedFilmsID.includes(props._id);

  // для того, чтобы если не оценено, не брался rating с filmsStore
  if (!isMovieRated_btn.value) {
    rating.value = 0;
  }

  filmsStore.getRatingOfCurrentFilmLoaded;
});

filmsStore._id = props._id;

filmsStore.setCurrentFilmById(filmsStore._id);

posterUrl.value = filmsStore.currentFilm.poster.url;

const sites = filmsStore.currentFilm.watchability.items;
const namesOfMovies = filmsStore.currentFilm.names;

const wantedKeysAboutFilm = {
  year: "Год",
  watchability: "Где посмотреть",
  movieLength: "Длительность фильма",
  description: "Описание",
  alternativeName: "Альтернативное название",
  releaseYears: "Годы выпуска:",
  names: "Все названия",
};

function goToSite(selectedSite) {
  if (selectedSite) {
    window.open(selectedSite, "_blank");
  }
}

function btnAddToFavClicked() {
  isMovieFavorite_btn.value = !isMovieFavorite_btn.value;

  isMovieFavorite_btn.value
    ? filmsStore.addToFavorite()
    : filmsStore.removeFromFavorite();
}

function btnAddToRatedClicked() {
  if (rating.value !== 0) {
    filmsStore.addToRated();

    isMovieRated_btn.value = !isMovieRated_btn.value;
  }
}

function btnRemoveFromRatedClicked() {
  filmsStore.removeFromRated();

  rating.value = 0;
  isMovieRated_btn.value = !isMovieRated_btn.value;
}

function toggleRating() {
  isMovieRated_btn.value ? btnRemoveFromRatedClicked() : btnAddToRatedClicked();
}
</script>

<template>
  <v-row>
    <v-col>
      <img class="poster-url" :width="500" :src="posterUrl" />
    </v-col>
    <v-col>
      <div>
        <div class="movie-name">
          <span>
            {{ filmsStore.currentFilm.name }}
            {{ "(" + filmsStore.currentFilm.year + ")" }}
          </span>
          <div class="d-flex flex-column">
            <span>
              <v-icon icon="mdi-star" style="font-size: 32px" />
              {{ `${" " + filmsStore.currentFilm.rating.kp.toFixed(1)}` }}
            </span>
          </div>
        </div>
        <div class="alternative-name-title">
          {{ filmsStore.currentFilm.alternativeName }}
        </div>
      </div>
      <div class="short-description">
        <div>
          {{ filmsStore.currentFilm.shortDescription }}
        </div>
      </div>

      <v-btn
        @click="btnAddToFavClicked()"
        class="btn btn-add-to-fav"
        variant="text"
      >
        <v-icon
          icon="mdi-book-heart"
          style="font-size: 42px"
          :color="btnStyles"
        />
      </v-btn>

      <div class="raiting">
        <v-rating
          v-model="rating"
          length="10"
          :item-labels="filmsStore.ratingLabels"
        >
          <template v-slot:item-label="props">
            <span class="font-weight-black text-caption">
              {{ props.label }}
            </span>
          </template>
        </v-rating>
      </div>

      <v-btn
        :class="{ 'rated-btn': isMovieRated_btn }"
        class="btn btn-rate"
        @click="toggleRating()"
        variant="tonal"
      >
        <span>{{ isMovieRated_btn ? "Удалить оценку" : "Оценить фильм" }}</span>
      </v-btn>

      <div class="about-film">
        <h3 class="accent-string movie-about-string">О фильме</h3>
      </div>

      <div class="movie-info">
        <div class="d-flex justify-space-between year">
          <v-col>
            {{ wantedKeysAboutFilm["year"] }}
          </v-col>
          <v-col>
            {{ filmsStore.currentFilm.year }}
          </v-col>
        </div>

        <div v-if="sites" class="d-flex justify-space-between watchability">
          <v-col>
            {{ wantedKeysAboutFilm["watchability"] }}
          </v-col>
          <div class="sites-to-watch">
            <v-col v-for="site in sites" :key="site._id">
              <div class="site-element" @click="goToSite(site.url)">
                <v-row>
                  <span class="site-name">
                    {{ site.name }}
                  </span>
                </v-row>
                <v-row>
                  <img :src="site.logo.url" height="48" width="48" />
                </v-row>
              </div>
            </v-col>
          </div>
        </div>

        <div class="d-flex justify-space-between movie-length">
          <v-col>
            {{ wantedKeysAboutFilm["movieLength"] }}
          </v-col>
          <v-col>
            {{
              `${Math.floor(filmsStore.currentFilm.movieLength / 60)}ч ${
                filmsStore.currentFilm.movieLength % 60
              }м`
            }}
          </v-col>
        </div>

        <div class="d-flex justify-space-between alternative-name">
          <v-col>
            {{ wantedKeysAboutFilm["alternativeName"] }}
          </v-col>
          <v-col>
            {{ filmsStore.currentFilm.alternativeName }}
          </v-col>
        </div>

        <div
          v-if="filmsStore.currentFilm.releaseYears.length"
          class="d-flex justify-space-between release-years"
        >
          <v-col>
            {{ wantedKeysAboutFilm["releaseYears"] }}
          </v-col>
          <v-col>
            {{ filmsStore.currentFilm.releaseYears[0].start }} -
            {{
              filmsStore.currentFilm.releaseYears[0].end
                ? filmsStore.currentFilm.releaseYears[0].end
                : "настоящее время"
            }}
          </v-col>
        </div>

        <div
          v-if="filmsStore.currentFilm.names"
          class="d-flex justify-space-between names"
        >
          <v-col>
            {{ wantedKeysAboutFilm["names"] }}
          </v-col>
          <v-col>
            <div v-for="movieName in namesOfMovies" :key="movieName._id">
              {{ movieName.name }}
            </div>
          </v-col>
        </div>
      </div>
    </v-col>

    <div class="d-flex justify-space-between movie-description">
      <div :title="wantedKeysAboutFilm['description']">
        <h3 class="accent-string">
          {{ wantedKeysAboutFilm["description"] }}
        </h3>
        <p>
          {{ filmsStore.currentFilm.description }}
        </p>
      </div>
    </div>
  </v-row>
</template>

<style lang="scss" scoped>
.movie-name {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  font-weight: 700;

  overflow-wrap: break-word;
}

.alternative-name-title {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
  letter-spacing: 0.1rem;
}

.accent-string {
  font-size: 22px;
  font-weight: 600;
}

.movie-about-string {
  margin: 20px 0 20px 0;
}

.site-name {
  overflow-wrap: break-word;
  text-overflow: hidden;
}

.site-element {
  margin: 20px;
}

.sites-to-watch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-height: 400px;
  max-width: 400px;
  overflow-y: auto;
  width: calc((100%) / 2);
  padding-right: 10px;
}

.movie-description {
  margin: 20px 0 20px 0;
}

.btn {
  font-size: 32px;
  padding: 10px;
}

.btn:hover {
  transform: scale(1.1);
  transition: transform 0.1s;
}

.btn-add-to-fav {
  height: 64px;
  width: 64px;
}

.rate-film-btn {
  font-size: 24px;
}

.btn-rate {
  font-size: 24px;
  height: 48px;
  width: 300px;
}
</style>
