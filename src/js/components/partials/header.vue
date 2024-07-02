<template>
    <nav class="navbar navbar-expand-lg navbar-light mt-3 mb-3 bg-light" v-if="isAdminMode">
        <router-link class="navbar-brand" to="/">
            <c-image src="resources/images/logo.png" class="logo" alt="Welcome!" :zoomable="false"/>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/resume">Resume</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/blog">Blog</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about-me">About me</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ImageComponent from "./image.vue";

    @Component({
        components: {
            cImage: ImageComponent
        }
    })
    export default class MenuComponent extends Vue {

        get isAdminMode() {
            return this.$store.state.isAdminMode;
        }

    }
</script>

<style scoped>
.logo {
    max-height: 50px;
}
</style>