<template>
    <div v-if="portfolio !== null">
        <div class="grid-projects">
            <div class="grid-item" v-for="(project, projectKey) in projects">
                <c-project :project="project" :projectKey="projectKey" :key="projectKey"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ProjectComponent from "./portfolio/project.vue";

    @Component({
        components: {
            cProject: ProjectComponent
        }
    })
    export default class PortfolioPageComponent extends Vue {
        mounted() {
            this.$store.commit("ensurePortfolioIsLoaded")
        }

        created() {
            this.$store.commit("addAlert", {
                type: "info",
                text: "This page is under development. More content will be available soon!",
                page: "/portfolio"
            });
        }

        get portfolio() {
            return this.$store.state.portfolio;
        }

        get projects() {
            return this.portfolio.projects;
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