import Vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
import Vuetify from "vite-plugin-vuetify";

export default {
  plugins: [Vue(), Vuetify({ autoImport: true })],
};
