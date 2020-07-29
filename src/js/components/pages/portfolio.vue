<template>
    <div v-if="portfolio">
        <div class="grid-projects">
            <div class="grid-item" v-for="(project, projectKey) in projects">
                <c-project-preview :project="project" :projectKey="projectKey" :key="projectKey"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ProjectPreviewComponent from "./portfolio/project-preview.vue";
    import {portfolioRes} from "../../store/resources";

    @Component({
        components: {
            cProjectPreview: ProjectPreviewComponent
        }
    })
    export default class PortfolioPageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", portfolioRes);
        }

        get portfolio() {
            return this.$store.state[portfolioRes.key];
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