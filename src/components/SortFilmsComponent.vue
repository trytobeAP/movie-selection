<script setup>
import { useFilmsStore } from "../store/films";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

const filmsStore = useFilmsStore();
const { sortByYear, sortByRating, sortByMovieLength } = storeToRefs(filmsStore);

const props = defineProps({
  filmsToSort: Array,
});

const filmsToSortInComponent = ref([]);

const emit = defineEmits(["sortedFilmsResult"]);

const sortFilmsBy = ref(["По возрастанию", "По убыванию", "Не выбрано"]);

onMounted(async () => {
  filmsToSortInComponent.value = props.filmsToSort;
});

function sortByProperty(property, order) {
  if (order === "По возрастанию") {
    return (a, b) => {
      const aValue = property.split(".").reduce((o, p) => o[p], a);
      const bValue = property.split(".").reduce((o, p) => o[p], b);
      return aValue - bValue;
    };
  } else if (order === "По убыванию") {
    return (a, b) => {
      const aValue = property.split(".").reduce((o, p) => o[p], a);
      const bValue = property.split(".").reduce((o, p) => o[p], b);
      return bValue - aValue;
    };
  } else {
    return () => 0;
  }
}

function sortMovies(property) {
  if (property === "year") {
    filmsToSortInComponent.value.sort(sortByProperty("year", sortByYear.value));
    console.log("sorted by Year");
  } else if (property === "rating") {
    filmsToSortInComponent.value.sort(
      sortByProperty("rating.kp", sortByRating.value)
    );
    console.log("sorted by Rating");
  } else if (property === "movieLength") {
    filmsToSortInComponent.value.sort(
      sortByProperty("movieLength", sortByMovieLength.value)
    );
    console.log("sorted by MovieLength");
  }

  emit("sortedFilmsResult", filmsToSortInComponent.value);
}

watch(
  () => props.filmsToSort,
  () => {
    filmsToSortInComponent.value = [...props.filmsToSort];
    sortMovies();
  }
);

watch(sortByYear, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    sortMovies("year");
  }
});

watch(sortByRating, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    sortMovies("rating");
  }
});

watch(sortByMovieLength, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    sortMovies("movieLength");
  }
});
</script>

<template>
  <div class="d-flex align-row">
    <v-select
      class="my-select sort-by-year"
      label="Сортировка по году"
      v-model="sortByYear"
      :items="sortFilmsBy"
      variant="outlined"
    />
    <v-spacer />
    <v-select
      class="my-select sort-by-raiting"
      label="Сортировка по рейтингу"
      v-model="sortByRating"
      :items="sortFilmsBy"
      variant="outlined"
    />
    <v-spacer />
    <v-select
      class="my-select sort-by-movie-length"
      label="Сортировка по длительности"
      v-model="sortByMovieLength"
      :items="sortFilmsBy"
      variant="outlined"
    />
  </div>
</template>
