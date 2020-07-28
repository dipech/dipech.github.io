<template>
    <img v-lazy="src" :alt="alt" :class="'img ' + classes">
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class ImageComponent extends Vue {
        @Prop()
        private src!: string;

        @Prop()
        private alt!: string;

        @Prop()
        private classes!: string;
    }
</script>

<style scoped>

</style>