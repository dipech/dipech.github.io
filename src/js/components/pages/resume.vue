<template>
    <div v-if="resume !== null">
        <c-user :user="resume.user"/>
        <h3 class="mt-4">
            Experience
            <small class="text-secondary total">
                {{ years }} {{ pluralForm(years, "year") }}
                {{ months }} {{ pluralForm(months, "month") }}
            </small>
        </h3>
        <c-experience :experience="experience" v-for="experience in resume.experience"
                      :key="experience.companyName"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import UserComponent from "./resume/user.vue";
    import ExperienceComponent from "./resume/experience.vue";
    import {pluralForm} from "../../functions/functions";
    import moment from "moment";

    @Component({
        components: {
            cUser: UserComponent,
            cExperience: ExperienceComponent
        },
        methods: {
            pluralForm
        }
    })
    export default class ResumePageComponent extends Vue {
        mounted() {
            this.$store.commit("ensureResumeIsLoaded")
        }

        get oldestDate(): moment.Moment {
            let oldest = moment();
            for (let exp of this.resume.experience) {
                let current = moment(exp.startDate, "MM.YYYY").startOf("month");
                if (current.isBefore(oldest)) {
                    oldest = current;
                }
            }
            return oldest;
        }

        get resume() {
            return this.$store.state.resume;
        }

        get years(): number {
            return moment().diff(this.oldestDate, "years");
        }

        get months(): number {
            return moment().diff(this.oldestDate, "months") - 12 * this.years;
        }
    }
</script>

<style scoped>
    .total {
        font-size: 12px !important;
    }
</style>
