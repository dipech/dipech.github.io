<template>
    <div>
        <c-preloader v-if="!loaded"/>
        <div v-if="loaded">
            <h3 class="mb-3">
                {{ project.name }}
                <span class="text-additional"> {{ project.description }}</span>
            </h3>
            <!--suppress HtmlUnknownTarget -->
            <c-image :src="logoUrl(project.logo)" class="logo mr-3 mb-3" alt="Logo"/>
            <template v-if="project.link">
                <div class="mb-3">
                    <a :href="project.link" class="project-link">{{ project.link }}</a>
                </div>
            </template>
            <div>
                <b>Year:</b>
                <c-badge>{{ project.year }}</c-badge>
            </div>
            <div>
                <b>Platform:</b>
                <c-badge>{{ project.technologies.platform }}</c-badge>
            </div>
            <div>
                <b>Languages:</b>
                <c-badge v-for="language in project.technologies.languages" :key="language">
                    {{ language }}
                </c-badge>
            </div>
            <div v-if="project.technologies.frameworks.length > 0">
                <b>Frameworks:</b>
                <c-badge v-for="framework in project.technologies.frameworks" :key="framework">
                    {{ framework }}
                </c-badge>
            </div>
            <div v-if="project.technologies.instruments.length > 0">
                <b>Instruments:</b>
                <c-badge v-for="instrument in project.technologies.instruments" :key="instrument">
                    {{ instrument }}
                </c-badge>
            </div>
            <div class="mt-3">
                <c-markdown :text="text"/>
            </div>
            <div class="clearfix"></div>
            <div>
                <c-carousel :images="images"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {ApiResource} from "../../../classes/api-resource";
    import MarkdownComponent from "../../partials/markdown.vue";
    import CarouselComponent from "../../partials/carousel.vue";
    import BadgeComponent from "../../partials/badge.vue";
    import ImageComponent from "../../partials/image.vue";
    import PreloaderComponent from "../../partials/preloader.vue";

    @Component({
        components: {
            cMarkdown: MarkdownComponent,
            cCarousel: CarouselComponent,
            cBadge: BadgeComponent,
            cImage: ImageComponent,
            cPreloader: PreloaderComponent
        }
    })
    export default class ProjectComponent extends Vue {

        @Prop()
        private projectKey!: string;

        @Prop()
        private project!: any;

        private textRes: ApiResource|null = null;

        mounted() {
            this.textRes = new ApiResource("portfolio", this.project.text);
            this.$store.commit("ensureResourceIsLoaded", this.textRes);
        }

        logoUrl(path: string): string {
            return (new ApiResource("portfolio", path)).url;
        }

        get text(): string {
            if (this.textRes === null) {
                throw new Error("textRes must be set!");
            }
            return this.$store.state[this.textRes.key];
        }

        get images(): ApiResource[] {
            let result: ApiResource[] = [];
            this.project.gallery.forEach((item: string) => {
                result.push(new ApiResource("portfolio", item));
            })
            return result;
        }

        get loaded() {
            return this.textRes && this.text;
        }

    }
</script>

<style scoped>
    .text-additional {
        font-size: 0.65em;
        font-weight: normal;
    }

    .logo {
        height: 100%;
        /* I don't know why, but this page isn't behaving correctly in smartphones if width >= 99.9% -_- */
        width: 99.8%;
    }

    .project-link {
        word-break: break-all;
    }

    @media only screen and (min-width: 500px) {
        .logo {
            float: left;
            height: auto;
            max-width: 250px;
        }
    }
</style>
