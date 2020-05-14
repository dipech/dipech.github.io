<template>
    <div class="badge badge-secondary my-badge">
        <slot/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class BadgeComponent extends Vue {
        @Prop()
        private name!: string;
    }
</script>

<style scoped>
    .my-badge {
        margin-right: 5px;
    }
</style>