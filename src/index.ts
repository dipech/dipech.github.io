import Vue from "vue";
import IndexComponent from "./components/index.vue";

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
