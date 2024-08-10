import { createRouter, createWebHistory } from "vue-router";

import MainPage from "../pages/MainPage.vue";
import MoviePage from "../pages/MoviePage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import RatedFilmsPage from "../pages/RatedFilmsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/film/:_id",
      name: "MoviePage",
      component: MoviePage,
    },
    {
      path: "/favorites",
      name: "FavoritesPage",
      component: FavoritesPage,
    },
    {
      path: "/rated",
      name: "RatedFilmsPage",
      component: RatedFilmsPage,
    },
  ],
});

export default router;
