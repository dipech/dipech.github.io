<template>
    <div v-if="portfolio">
        <c-project :project="project" :projectKey="projectKey" />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ProjectComponent from "./portfolio/project.vue";
    import {portfolioRes} from "../../store/resources";

    @Component({
        components: {
            cProject: ProjectComponent
        }
    })
    export default class ProjectPageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", portfolioRes);
        }

        get portfolio() {
            return this.$store.state[portfolioRes.key];
        }

        get projectKey(): string {
            return this.$router.currentRoute.params.keyword;
        }

        get project() {
            return this.portfolio.projects[this.projectKey];
        }

    }
</script>

<style scoped>
    .grid-projects {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 1rem;
    }
</style>