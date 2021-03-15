<template>
    <div class="card">
        <div class="card-header">
            {{ post.title }}
        </div>
        <div class="card-body">
            <!--suppress HtmlUnknownTarget -->
            <c-image :src="logoUrl(post.logo)" class="logo mr-4" alt="Logo" :zoomable="false"/>
<!--            <small>Posted on <b>{{ post.dateCreated }}</b></small>-->
            <div>
                <small>
                    <c-badge v-for="tag in post.tags" :key="tag">
                        {{ tag }}
                    </c-badge>
                </small>
            </div>
            <small class="d-block mt-2 mb-2">
                {{ post.preview }}
                <span class="d-none d-sm-inline">
                    <router-link :to="{ name: 'post', params: { keyword: postKeyword }}">
                        &nbsp; Read more →
                    </router-link>
                </span>
            </small>
            <div class="d-block d-sm-none">
                <router-link :to="{ name: 'post', params: { keyword: postKeyword }}">
                    <button class="btn btn-sm btn-block btn-outline-secondary">
                        Read more →
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
    import BadgeComponent from "../../partials/badge.vue";
    import ImageComponent from "../../partials/image.vue";

    @Component({
        components: {
            cBadge: BadgeComponent,
            cImage: ImageComponent
        }
    })
    export default class PostPreviewComponent extends Vue {

        @Prop()
        private post!: any;

        @Prop()
        private postKeyword!: string;

        logoUrl(path: string): string {
            return (new ApiResource("blog", path)).url;
        }

    }
</script>

<style scoped>
    .logo {
        height: auto;
        width: 100%;
    }

    @media only screen and (min-width: 500px) {
        .logo {
            float: left;
            height: auto;
            max-width: 150px;
        }
    }
</style>
