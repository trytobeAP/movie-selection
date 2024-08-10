<template>
  <v-app dark>
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer class="navigation-drawer" rail expand-on-hover>
        <v-list>
          <router-link
            :to="{
              name: 'MainPage',
            }"
          >
            <v-list-item title="Главная" prepend-icon="mdi-home" />
          </router-link>

          <router-link
            :to="{
              name: 'FavoritesPage',
            }"
          >
            <v-list-item title="Закладки" prepend-icon="mdi-book-heart" />
          </router-link>

          <router-link
            :to="{
              name: 'RatedFilmsPage',
            }"
          >
            <v-list-item title="Оцененные" prepend-icon="mdi-star" />
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main
        class="d-flex align-center justify-center"
        style="min-height: 100vh"
      >
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
