import Vue from "vue";
import IndexComponent from "./components/index.vue";
import "../css/index.scss";
import "bootstrap";

class App {

    private instance: Vue;

    constructor() {
        this.instance = new Vue({
            el: "#app",
            render: h => h(IndexComponent),
        })
    }

}

new App();
