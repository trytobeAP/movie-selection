<script setup>
import { onMounted, ref } from "vue";
import CardFilm from "../components/CardFilm.vue";
import SortFilmsComponent from "../components/SortFilmsComponent.vue";
import { useFilmsStore } from "../store/films";

const filmsStore = useFilmsStore();

// const filmsFavorites = ref([]);
const filmsFavoritesID = ref([]);

// prop
const filmsToSortArray = ref([]);
// emit
const responseSortedFilms = ref([]);

onMounted(async () => {
  await filmsStore.getDataToStore;

  filmsFavoritesID.value = filmsStore.favoriteFilmsID;

  filmsToSortArray.value = filmsStore.favoriteFilms;
  responseSortedFilms.value = [...filmsToSortArray.value]; //
});
</script>

<template>
  <v-container>
    <div v-if="filmsFavoritesID.length">
      <SortFilmsComponent
        @sortedFilmsResult="
          (filmsToSort) => (responseSortedFilms = filmsToSort)
        "
        :filmsToSort="filmsToSortArray"
      />
    </div>
    <v-row v-if="filmsFavoritesID.length" class="films-json">
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
    <v-row v-else>
      <v-alert
        text="Вы еще не добавили ни одного фильма в закладки. Нажмите на иконку добавления на странице понравившегося Вам фильма для добавления его в закладки"
        title="Нет фильмов"
        type="warning"
        variant="outlined"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.accent-string {
  font-size: 22px;
  font-weight: 600;
}
</style>
