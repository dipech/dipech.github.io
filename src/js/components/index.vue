<template>
    <div class="container">
        <c-menu/>
        <div class="alert alert-info">
            Actual site content (portfolio, blog, etc) will be available soon!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                Index component
            </div>
            <div class="card-body">
                Hello, {{greeting}}!<br>
                <label>Greeting: <input v-model="greeting" type="text"></label>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                Hello component
            </div>
            <div class="card-body">
                <c-hello :counter="5"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HelloComponent from "./hello.vue";
    import MenuComponent from "./page/menu.vue";

    @Component({
        components: {
            cHello: HelloComponent,
            cMenu: MenuComponent,
        }
    })
    export default class IndexComponent extends Vue {
        // @todo use https://github.com/ktsn/vuex-class for state and mutations
        get greeting() {
            return this.$store.state.greeting;
        }

        set greeting(greeting: string) {
            this.$store.commit("setGreeting", greeting);
        }
    }
</script>
