<template>
    <div>
        Portfolio page component
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
    import HelloComponent from "../components/hello.vue";

    @Component({
        components: {
            cHello: HelloComponent
        }
    })
    export default class PortfolioPageComponent extends Vue {
        get greeting() {
            return this.$store.state.greeting;
        }

        set greeting(greeting: string) {
            this.$store.commit("setGreeting", greeting);
        }
    }
</script>
