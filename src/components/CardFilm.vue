<script setup>
import { useFilmsStore } from "../store/films";

const filmsStore = useFilmsStore();

const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div @click="filmsStore.setCurrentFilm(film)">
    <router-link :to="`/film/${film.externalId._id}`" active-class="active">
      <v-card
        class="card-bg-img ma-1 pa-2 card-film d-flex justify-end flex-column"
        :style="{
          backgroundImage: `url(${film.poster.previewUrl})`,
        }"
      >
        <v-card
          :subtitle="film.rating.kp.toFixed(1)"
          prepend-icon="mdi-star"
          class="raiting d-flex justify-start"
        />

        <v-card class="card-film-info" :title="film.name" :subtitle="film.year">
        </v-card>
      </v-card>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
$opacity-card-info: 0.95;

.card-film {
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.8;
}

.card-bg-img {
  margin: 0 auto;
}

.card-film:hover {
  opacity: 1;
}

.card-bg-img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
}

.card-film-info {
  opacity: $opacity-card-info;
}

.raiting {
  box-sizing: border-box;
  max-width: 26%; // here the rating width
  opacity: $opacity-card-info;
}
</style>
