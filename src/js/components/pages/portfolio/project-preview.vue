<template>
    <div class="card project">
        <div class="card-header">
            {{ project.name }}
        </div>
        <div class="card-body">
            <!--suppress HtmlUnknownTarget -->
            <c-image :src="logoUrl(project.logo)" class="logo" alt="Logo" :zoomable="false"/>
            <small class="d-block mt-3 mb-3">{{ project.description }}</small>
            <div class="text-right link d-none d-sm-block">
                <router-link :to="{ name: 'project', params: { keyword: projectKey }}">
                    show more →
                </router-link>
            </div>
            <div class="d-block d-sm-none">
                <router-link :to="{ name: 'project', params: { keyword: projectKey }}">
                    <button class="btn btn-sm btn-block btn-outline-secondary">
                        show more →
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {ApiResource} from "../../../classes/api-resource";
    import ImageComponent from "../../partials/image.vue";

    @Component({
        components: {
            cImage: ImageComponent
        }
    })
    export default class ProjectPreviewComponent extends Vue {

        @Prop()
        private projectKey!: string;

        @Prop()
        private project!: any;

        logoUrl(path: string): string {
            return (new ApiResource("portfolio", path)).url;
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

    .link {
        font-size: 0.9em;
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
</style>
