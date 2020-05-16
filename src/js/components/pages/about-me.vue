<template>
    <div v-if="about && text">
        <c-markdown :text="text"/>
        <c-carousel :images="images"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {aboutMeRes, aboutMeTextRes} from "../../store/resources";
    import CarouselComponent from "../partials/carousel.vue";
    import {ApiResource} from "../../classes/api-resource";
    import MarkdownComponent from "../partials/markdown.vue";

    @Component({
        components: {
            cCarousel: CarouselComponent,
            cMarkdown: MarkdownComponent
        }
    })
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

        get images(): ApiResource[] {
            let result: ApiResource[] = [];
            this.about.gallery.forEach((item: string) => {
                result.push(new ApiResource("about-me", item));
            })
            return result;
        }

    }
</script>
