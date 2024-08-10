import { createPinia } from "pinia";

// Styles
import "./styles/settings.scss";  

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Import and use Vuetify before importing and using the router
import vuetify from "./plugins/vuetify.js";

// Router
import router from "./router/index.js";

const app = createApp(App);

app.use(createPinia()).use(vuetify).use(router);

app.mount("#app");
