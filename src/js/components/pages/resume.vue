<template>
    <div v-if="resume">
        <c-user :user="resume.user"/>
        <h3 class="mt-4">Key skills</h3>
        <c-badge v-for="skill in resume.keySkills" :key="skill">
            {{ skill }}
        </c-badge>
        <h3 class="mt-4">
            Experience
            <small class="text-secondary total">
                {{ years }} {{ pluralForm(years, "year") }}
                {{ months }} {{ pluralForm(months, "month") }}
            </small>
        </h3>
        <c-experience v-for="experience in resume.experience"
                      :experience="experience" :key="experience.companyName"/>
        <h3 class="mt-4">Courses</h3>
        <c-course v-for="course in resume.courses"
                  :course="course" :key="course.name"/>
        <h3 class="mt-4">Education</h3>
        <c-education v-for="education in resume.education"
                     :education="education" :key="education.name"/>
        <h3 class="mt-4">Languages</h3>
        <c-language v-for="language in resume.languages"
                    :language="language" :key="language.name"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import UserComponent from "./resume/user.vue";
    import ExperienceComponent from "./resume/experience.vue";
    import CourseComponent from "./resume/course.vue";
    import EducationComponent from "./resume/education.vue";
    import BadgeComponent from "../partials/badge.vue";
    import LanguageComponent from "./resume/language.vue";
    import {pluralForm} from "../../functions/functions";
    import moment from "moment";
    import {resumeRes} from "../../store/resources";

    @Component({
        components: {
            cUser: UserComponent,
            cExperience: ExperienceComponent,
            cCourse: CourseComponent,
            cEducation: EducationComponent,
            cBadge: BadgeComponent,
            cLanguage: LanguageComponent
        },
        methods: {
            pluralForm
        }
    })
    export default class ResumePageComponent extends Vue {

        mounted() {
            this.$store.commit("ensureResourceIsLoaded", resumeRes)
        }

        get resume() {
            return this.$store.state[resumeRes.key];
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
