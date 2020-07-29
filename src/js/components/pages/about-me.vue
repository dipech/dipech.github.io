<template>
    <div>
        <c-preloader v-if="!loaded"/>
        <div v-if="loaded">
            <c-markdown :text="text"/>
            <c-carousel :images="images"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {aboutMeRes} from "../../store/resources";
    import CarouselComponent from "../partials/carousel.vue";
    import {ApiResource} from "../../classes/api-resource";
    import MarkdownComponent from "../partials/markdown.vue";
    import PreloaderComponent from "../partials/preloader.vue";

    @Component({
        components: {
            cCarousel: CarouselComponent,
            cMarkdown: MarkdownComponent,
            cPreloader: PreloaderComponent
        }
    })
    export default class AboutMePageComponent extends Vue {

        private aboutMeTextRes: ApiResource | null = null;

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", aboutMeRes);
        }

        get about() {
            return this.$store.state[aboutMeRes.key];
        }

        get text() {
            if (!this.about && !this.aboutMeTextRes) {
                return null;
            }
            if (!this.aboutMeTextRes) {
                this.aboutMeTextRes = new ApiResource("about-me", this.about.text);
                this.$store.commit("ensureResourceIsLoaded", this.aboutMeTextRes);
            }
            return this.$store.state[this.aboutMeTextRes.key];
        }

        get loaded() {
            return this.about && this.text;
        }

        get images(): ApiResource[] {
            let result: ApiResource[] = [];
            this.about.gallery.forEach((item: string) => {
                result.push(new ApiResource("about-me", item));
            })
            return result;
        }
    }
</script>
