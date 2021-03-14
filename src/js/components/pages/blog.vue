<template>
    <div>
        <c-preloader v-if="!loaded"/>
        <div v-if="loaded">
            <div class="row">
                <div class="col-12" v-for="(post, postKeyword) in posts">
                    <c-post-preview :post="post" :postKeyword="postKeyword" :key="postKeyword"
                                    :class="{ 'mb-3': !isLast(postKeyword) }"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import PostPreviewComponent from "./blog/post-preview.vue";
    import {blogRes} from "../../store/resources";
    import PreloaderComponent from "../partials/preloader.vue";

    @Component({
        components: {
            cPostPreview: PostPreviewComponent,
            cPreloader: PreloaderComponent
        }
    })
    export default class BlogPageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", blogRes);
        }

        get blog() {
            return this.$store.state[blogRes.key];
        }

        get isAdminMode() {
            return this.$store.state.isAdminMode;
        }

        get posts() {
            let posts: any = {};
            for (let postKeyword in this.blog.posts) {
                let post = this.blog.posts[postKeyword];
                if (post.isPublished || this.isAdminMode) {
                    posts[postKeyword] = post;
                }
            }
            return posts;
        }

        get loaded() {
            return this.blog;
        }

        isLast(postKeyword: string) {
            let keywords = Object.keys(this.posts);
            return keywords[keywords.length - 1] === postKeyword;
        }

    }
</script>
