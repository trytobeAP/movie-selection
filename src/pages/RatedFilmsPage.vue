<script setup>
import { ref, onMounted, watchEffect } from "vue";
import CardFilm from "../components/CardFilm.vue";
import SortFilmsComponent from "../components/SortFilmsComponent.vue";
import { useFilmsStore } from "../store/films";
import { storeToRefs } from "pinia";

const filmsStore = useFilmsStore();

const ratedFilmsID = ref([]);
const ratedFilms = ref([]);

// prop
const filmsToSortArray = ref([]);
// emit
const responseSortedFilms = ref([]);

onMounted(async () => {
  await filmsStore.getDataToStore;

  ratedFilms.value = filmsStore.ratedFilms;
  ratedFilmsID.value = filmsStore.ratedFilmsID;

  filmsToSortArray.value = [...ratedFilms.value];
  responseSortedFilms.value = [...filmsToSortArray.value];
});
</script>

<template>
  <v-container>
    <div v-if="ratedFilmsID.length">
      <SortFilmsComponent
        @sortedFilmsResult="
          (filmsToSort) => (responseSortedFilms = filmsToSort)
        "
        :filmsToSort="filmsToSortArray"
      />
    </div>
    <v-row v-if="ratedFilmsID.length" class="films-json">
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
        text="Вы еще не оценили ни одного фильма. Нажмите звезды рейтинга на странице фильма, который хотите оценить для добавления его в оцененные"
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
