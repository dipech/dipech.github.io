<template>
    <div class="row mt-2">
        <div class="col-md-3">
            {{ education.startYear }} — {{ education.endYear }}
        </div>
        <div class="col-md-9">
            <b>{{ education.name }}</b>
            <template v-if="education.type === 'university'">
                <small class="text-secondary">
                    {{ education.degree }}
                </small>
            </template>
            <div v-if="education.type === 'university' || education.type === 'high-school'">
                {{ education.fieldOfStudy }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class EducationComponent extends Vue {
        @Prop()
        private education!: any;
    }
</script>

<style scoped>

</style>
