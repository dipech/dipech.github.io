import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import createStore from "./store/create";
import createRouter from "./router/create";
import IndexComponent from "./components/index.vue";
import "../css/index.scss";
import "bootstrap";
import "owl.carousel/dist/owl.carousel.min";

class App {

    private vue: Vue;

    constructor() {
        Vue.use(Vuex);
        Vue.use(VueRouter);
        this.vue = new Vue({
            el: "#app",
            store: createStore(),
            router: createRouter(),
            render: h => h(IndexComponent),
        })
    }

}

new App();
