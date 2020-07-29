<template>
    <div>
        <c-preloader v-if="!loaded"/>
        <div v-if="loaded">
            <div class="grid-projects">
                <div class="grid-item" v-for="(project, projectKey) in projects">
                    <c-project-preview :project="project" :projectKey="projectKey" :key="projectKey"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ProjectPreviewComponent from "./portfolio/project-preview.vue";
    import {portfolioRes} from "../../store/resources";
    import PreloaderComponent from "../partials/preloader.vue";

    @Component({
        components: {
            cProjectPreview: ProjectPreviewComponent,
            cPreloader: PreloaderComponent
        }
    })
    export default class PortfolioPageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", portfolioRes);
        }

        get portfolio() {
            return this.$store.state[portfolioRes.key];
        }

        get loaded() {
            return this.portfolio;
        }

        get projects() {
            return this.portfolio.projects;
        }

    }
</script>

<style scoped>
    .grid-projects {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 1rem;
    }
</style>