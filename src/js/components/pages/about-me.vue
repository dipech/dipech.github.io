<template>
    <div v-if="about && text">
        {{ text }}
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {aboutMeRes, aboutMeTextRes} from "../../store/resources";

    @Component
    export default class AboutMePageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", aboutMeRes);
            this.$store.commit("ensureResourceIsLoaded", aboutMeTextRes);
        }

        get about() {
            return this.$store.state[aboutMeRes.key];
        }

        get text() {
            return this.$store.state[aboutMeTextRes.key];
        }

    }
</script>
