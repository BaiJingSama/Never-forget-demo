import { fetchMe, mePromise } from "./shared/me";
import { history } from "./shared/history";
import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import "@svgstore";
import { http } from "./shared/HttpClient";

const router = createRouter({
  history,
  routes,
});

fetchMe();

router.beforeEach(async (to, from) => {
  if (
    ["/", "/start"].includes(to.path) ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in")
  ) {
    return true;
  } else {
    //如果return promise就不用写await
    return mePromise!.then(
      () => true,
      () => "/sign_in?return_to=" + to.path
    );
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
