import Vue from "vue";
import Vuex from "vuex";
import createStore from "./store/create";
import IndexComponent from "./components/index.vue";
import "../css/index.scss";
import "bootstrap";

class App {

    private vue: Vue;

    constructor() {
        Vue.use(Vuex);
        this.vue = new Vue({
            el: "#app",
            store: createStore(),
            render: h => h(IndexComponent),
        })
    }

}

new App();
