<template>
    <div class="row mt-2">
        <div class="col-md-3">
            {{ language.level }}
        </div>
        <div class="col-md-9">
            <b>{{ language.name }}</b>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class LanguageComponent extends Vue {
        @Prop()
        private language!: any;
    }
</script>

<style scoped>

</style>
