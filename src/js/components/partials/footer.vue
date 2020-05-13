<template>
    <footer class="bg-light mt-4 mb-3 p-4">
        <a :href="siteUrl">{{ domain }}</a>, {{ year }}
        <div class="float-right">
            All rights reserved (c)
        </div>
    </footer>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class FooterComponent extends Vue {
        get domain(): string {
            return window.location.hostname;
        }
        get siteUrl(): string {
            return window.location.protocol + "//" + this.domain;
        }
        get year(): number {
            return new Date().getFullYear();
        }
    }
</script>

<style scoped>

</style>