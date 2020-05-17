<template>
    <div v-if="blog">
        <c-post :post="post" :postKeyword="postKeyword"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import PostComponent from "./blog/post.vue";
    import {blogRes} from "../../store/resources";

    @Component({
        components: {
            cPost: PostComponent
        }
    })
    export default class PostPageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", blogRes);
        }

        get blog() {
            return this.$store.state[blogRes.key];
        }

        get postKeyword(): string {
            return this.$router.currentRoute.params.keyword;
        }

        get post() {
            return this.blog.posts[this.postKeyword];
        }

    }
</script>
