<script setup>
import { useFilmsStore } from "../store/films";
import { ref, onMounted, watch } from "vue";
import CardFilm from "../components/CardFilm.vue";
import SortFilmsComponent from "../components/SortFilmsComponent.vue";

const filmsStore = useFilmsStore();

// prop
const filmsToSortArray = ref([]);
// emit
const responseSortedFilms = ref([]);

const inputSearchValue = ref("");
const searchedFilms = ref([]);

const renderSearchedFilms = ref(false);

onMounted(async () => {
  await filmsStore.getDataToStore;
  filmsToSortArray.value = [...filmsStore.films];
});

function clearSearchedFilms() {
  searchedFilms.value = [];
}

function findSearchedFilms() {
  clearSearchedFilms();
  searchedFilms.value = filmsStore.films.filter((filmElem) =>
    filmElem.name
      .toLocaleLowerCase()
      .includes(inputSearchValue.value.toLocaleLowerCase())
  );
  renderSearchedFilms.value = inputSearchValue.value.length > 0;
}

watch(inputSearchValue, findSearchedFilms);
</script>

<template>
  <v-container>
    <v-app-bar class="application-bar">
      <v-container class="default-input-container mu-3">
        <input
          class="default-input"
          v-model="inputSearchValue"
          @keydown.enter="findSearchedFilms()"
          placeholder="Введите фильм для поиска"
        />
      </v-container>
    </v-app-bar>

    <div class="main-container ml-1 mt-1">
      <SortFilmsComponent
        @sortedFilmsResult="
          (filmsToSort) => (responseSortedFilms = filmsToSort)
        "
        :filmsToSort="filmsToSortArray"
      />

      <v-row v-if="renderSearchedFilms" class="searched-film">
        <v-col
          v-for="film in searchedFilms"
          :key="film.externalId._id"
          cols="4"
        >
          <router-link
            :to="{
              name: 'MoviePage',
              state: { film: film },
              params: { _id: film.externalId._id },
            }"
          >
            <CardFilm :film="film" />
          </router-link>
        </v-col>
        <v-divider class="border-opacity-100" color="white" />
      </v-row>

      <v-container>
        <v-row class="sorted-movies">
          <v-col
            v-for="film in responseSortedFilms"
            :key="film.externalId._id"
            cols="4"
          >
            <router-link
              :to="{
                name: 'MoviePage',
                state: { film: film },
                params: { _id: film.externalId._id },
              }"
            >
              <CardFilm :film="film" />
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
