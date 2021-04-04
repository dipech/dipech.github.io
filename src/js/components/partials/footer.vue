<template>
    <footer class="bg-light mt-3 mb-3 p-4">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 text-center text-sm-left">
                <a :href="siteUrl">{{ domain }}</a>, {{ year }}
            </div>
            <div class="col-12 col-sm-6 col-md-6 text-center text-sm-right">
                <div class="font-italic not-selectable not-focusable"
                     @click="handleClick">
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

        counter: number = 1;

        get domain(): string {
            return window.location.hostname;
        }

        get siteUrl(): string {
            return window.location.protocol + "//" + this.domain;
        }

        get year(): number {
            return new Date().getFullYear();
        }

        get isAdminMode() {
            return this.$store.state.isAdminMode;
        }

        handleClick() {
            if (this.counter++ >= 10 && !this.isAdminMode) {
                console.log("Admin mode has been activated!");
                this.$store.commit("setAdminMode", true);
            }
        }
    }
</script>

<style scoped>

</style>