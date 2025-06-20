import "./styles/app.css";
import { createApp } from "vue";
import App from "./app.vue";
import router from "./router/index.js";
import store from "./store/store.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
