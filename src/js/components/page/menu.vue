<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3 mb-3">
        <a class="navbar-brand" href="#">
            <img src="resources/logo.png" class="logo" alt="Welcome!">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Portfolio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About me</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class MenuComponent extends Vue {

    }
</script>

<style scoped>
    .logo {
        max-height: 30px;
    }
</style>