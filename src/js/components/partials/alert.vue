<template>
    <div :class="'alert alert-' + type">
        <slot/>
        <button type="button" class="close" @click="remove()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class AlertComponent extends Vue {
        @Prop()
        private type!: string;

        @Prop()
        private index!: number;

        remove() {
            this.$store.commit("removeAlert", this.index);
        }
    }
</script>

<style scoped>

</style>