<template>
    <div v-if="about !== null">
        {{ text }}
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {getResourceUrl, loadResource} from "../../functions/functions";
    import {Resource} from "../../classes/resource";

    @Component
    export default class AboutMePageComponent extends Vue {
        mounted() {
            this.$store.commit("ensureAboutMeIsLoaded", () => {
                loadResource(getResourceUrl("about-me", this.about.text), (content => {
                    this.$store.commit("addResource", new Resource("about-me-text", content));
                }));
            })
        }

        get about() {
            return this.$store.state.aboutMe;
        }

        get text() {
            return this.$store.state.resources.get("about-me-text");
        }
    }
</script>
