<script setup>
import { onMounted, ref } from "vue";
import MovieInfo from "../components/MovieInfo.vue";
import { useRoute } from "vue-router";
import { useFilmsStore } from "../store/films";

const filmsStore = useFilmsStore();

const route = useRoute();

const _id = ref("");

onMounted(async () => {
  await filmsStore.getDataToStore;
  _id.value = route.params._id;
});
</script>

<template>
  <v-container>
    <MovieInfo v-if="_id" :_id="_id" />
  </v-container>
</template>
