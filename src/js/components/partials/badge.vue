<template>
    <div class="badge badge-secondary my-badge" :class="{ 'badge-muted': additional }">
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

        @Prop()
        public additional!: boolean;
    }
</script>

<style scoped>
.my-badge {
    margin-right: 5px;
}
.badge-muted {
    opacity: 0.8;
}
</style>