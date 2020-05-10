import Vue from "vue";
import Hello from "./components/hello.vue";

// @todo Improve the app like here: https://habr.com/ru/post/330400/

new Vue({
    el: "#app",
    template: `
        <div>
            <div>Hello {{name}}!</div>
            <hello :name="name" :initialEnthusiasm="5" />
            Name: <input v-model="name" type="text">
        </div>
    `,
    data: {
        name: "World"
    },
    components: {
        Hello
    }
});
