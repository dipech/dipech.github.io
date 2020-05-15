<template>
    <div class="card project">
        <div class="card-header">
            {{ project.name }}
        </div>
        <div class="card-body">
            <!--suppress HtmlUnknownTarget -->
            <img :src="getFileUrl(project.logo)" class="logo" alt="Logo">
            <small class="d-block mt-3">{{ project.description }}</small>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class ProjectComponent extends Vue {
        @Prop()
        private projectKey!: string;

        @Prop()
        private project!: any;

        get resourcesPath(): string {
            return "resources/data/portfolio/" + this.projectKey;
        }

        getFileUrl(fileName: string): string {
            return this.resourcesPath + "/" + fileName;
        }
    }
</script>

<style scoped>
    .project {
        height: 100%;
    }
    .logo {
        display: block;
        margin: 0 auto;
        max-height: 150px;
        max-width: 100%;
    }
</style>
