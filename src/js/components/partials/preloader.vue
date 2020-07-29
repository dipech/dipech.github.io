<template>
    <div class="preloader">
        <!--suppress HtmlUnknownTarget -->
        <img :src="url" alt="Preloader!"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import loadingImage from "../../../img/loading.gif";

    @Component
    export default class PreloaderComponent extends Vue {

        get url() {
            return loadingImage;
        }

    }
</script>

<style>
    .preloader {
        width: 100%;
    }

    .preloader img {
        display: block;
        margin: 0 auto;
        max-height: 100px;
        width: auto;
    }
</style>
