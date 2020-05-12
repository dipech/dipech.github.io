<template>
    <div class="container">
        <c-menu/>
        <div class="alert alert-info">
            Actual site content (portfolio, blog, etc) will be available soon!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import MenuComponent from "./partials/menu.vue";

    @Component({
        components: {
            cMenu: MenuComponent
        }
    })
    export default class IndexComponent extends Vue {
        get greeting() {
            return this.$store.state.greeting;
        }

        set greeting(greeting: string) {
            this.$store.commit("setGreeting", greeting);
        }
    }
</script>
