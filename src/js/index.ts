import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueLazyload from "vue-lazyload";
import Viewer from "v-viewer";
import createStore from "./store/create";
import createRouter from "./router/create";
import IndexComponent from "./components/index.vue";
import "../css/index.scss";
import "bootstrap";
import loadingImage from "../img/loading.gif";
import noImageImage from "../img/no-image.png";

class App {

    private vue: Vue;

    constructor() {
        Vue.use(Vuex);
        Vue.use(VueRouter);
        Vue.use(VueLazyload, {
            preLoad: 1.3,
            error: noImageImage,
            loading: loadingImage,
            attempt: 1
        });
        Vue.use(Viewer);
        this.vue = new Vue({
            el: "#app",
            store: createStore(),
            router: createRouter(),
            render: h => h(IndexComponent),
        });
    }

}

new App();
