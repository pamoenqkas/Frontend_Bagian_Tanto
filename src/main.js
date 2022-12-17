import { createApp } from "vue";
import App from "./App.vue";

//import router
import router from "./router";

//import Bootstrap, Popper, jQuery
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";

import vue3StarRatings from "vue3-star-ratings";

const app = createApp(App);

//impor

//use vue router
app.use(router);
app.mount("#app");
app.component("vue3-star-ratings", vue3StarRatings);

