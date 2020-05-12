<template>
    <div class="container">
        <c-header/>
        <div class="alert alert-info">
            This site is still in development. Actual content will be available soon!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <router-view/>
        <c-footer/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HeaderComponent from "./partials/header.vue";
    import FooterComponent from "./partials/footer.vue";

    @Component({
        components: {
            cHeader: HeaderComponent,
            cFooter: FooterComponent
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
