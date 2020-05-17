<template>
    <div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class MaintenanceComponent extends Vue {

        mounted() {
            $(".navbar-collapse a").on("click", function () {
                ($(".navbar-collapse") as any).collapse('hide');
            });
        }

    }
</script>

<style scoped>

</style>