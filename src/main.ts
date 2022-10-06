import { history } from './shared/history';
import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";


const router = createRouter({
  history,
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
