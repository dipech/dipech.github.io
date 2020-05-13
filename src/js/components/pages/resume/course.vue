<template>
    <div class="row mt-2">
        <div class="col-md-3">
            {{ course.year }}
        </div>
        <div class="col-md-9">
            <b>{{ course.name }}</b>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class CourseComponent extends Vue {
        @Prop()
        private course!: any;
    }
</script>

<style scoped>

</style>
