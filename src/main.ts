import { history } from './shared/history';
import { createApp } from "vue";
import { App } from "./App";
import { Bar } from "./views/Bar";
import { Foo } from "./views/Foo";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";


const router = createRouter({
  history,
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
