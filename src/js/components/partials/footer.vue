<template>
    <footer class="bg-light mt-3 mb-3 p-4">
        <div class="row">
            <div class="col-12 col-md-6 text-center text-sm-left">
                <a :href="siteUrl">{{ domain }}</a>, {{ year }}
            </div>
            <div class="col-12 col-md-6 text-center text-sm-right">
                <div class="font-italic">
                    All rights are lost ©
                </div>
            </div>
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