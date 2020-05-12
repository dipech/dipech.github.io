<template>
    <div class="row mt-4">
        <div class="col-md-3">
            {{ experience.startDate }} — {{ experience.endDate }}<br>
            <small class="text-secondary">
                {{ years }} years {{ months }} months
            </small>
        </div>
        <div class="col-md-9">
            <b>{{ experience.companyName }}</b>
            <br>
            {{ experience.location }}
            <template v-if="experience.website">
                [ <a :href="experience.website" rel="nofollow">{{ experience.website }}</a> ]
            </template>
            <br>
            {{ experience.companyDescription }}<br>
            <b>{{ experience.position }}</b> <small class="text-secondary">{{ experience.employmentType }}</small>
            <ul>
                <li v-for="duty in experience.duties">
                    {{ duty }}
                </li>
            </ul>
            <c-badge v-for="technology in experience.technologies" :key="technology">
                {{ technology }}
            </c-badge>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import BadgeComponent from "../../partials/badge.vue";

    @Component({
        components: {
            cBadge: BadgeComponent
        }
    })
    export default class ExperienceComponent extends Vue {
        @Prop()
        private experience!: any;

        get years(): number {
            return 2
        }

        get months(): number {
            return 5
        }
    }
</script>

<style scoped>

</style>
