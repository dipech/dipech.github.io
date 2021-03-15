<template>
    <div class="post">
        <c-preloader v-if="!loaded"/>
        <div v-if="loaded">
            <h1 class="mb-3">{{ post.title }}</h1>
<!--            <small>Posted on <b>{{ post.dateCreated }}</b></small>-->
            &nbsp;&nbsp;
            <c-badge v-for="tag in post.tags" :key="tag">
                {{ tag }}
            </c-badge>
            <div class="mt-2 mb-2 text">
                <c-markdown :text="text"/>
            </div>
<!--            <template v-if="post.dateUpdated !== null">-->
<!--                <small class="text-secondary">Updated at <b>{{ post.dateUpdated }}</b></small>-->
<!--            </template>-->
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import MarkdownComponent from "../../partials/markdown.vue";
    import {ApiResource} from "../../../classes/api-resource";
    import BadgeComponent from "../../partials/badge.vue";
    import PreloaderComponent from "../../partials/preloader.vue";

    @Component({
        components: {
            cMarkdown: MarkdownComponent,
            cBadge: BadgeComponent,
            cPreloader: PreloaderComponent
        }
    })
    export default class PostComponent extends Vue {

        @Prop()
        private post!: any;

        @Prop()
        private postKeyword!: string;

        private textRes: ApiResource|null = null;

        mounted() {
            this.textRes = new ApiResource("blog", this.post.text);
            this.$store.commit("ensureResourceIsLoaded", this.textRes);
        }

        get text(): string {
            if (this.textRes === null) {
                throw new Error("textRes must be set!");
            }
            return this.$store.state[this.textRes.key];
        }

        get loaded() {
            return this.textRes && this.text;
        }

    }
</script>

<style scoped>
    .logo {
        height: 100%;
        width: 100%;
    }

    @media only screen and (min-width: 500px) {
        .logo {
            float: left;
            height: auto;
            max-width: 250px;
        }
    }
</style>
