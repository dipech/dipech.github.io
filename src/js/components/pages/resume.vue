<template>
    <div v-if="resume !== null">
        <c-user :user="resume.user"/>
        <h3 class="mt-4">Experience</h3>
        <c-experience :experience="experience" v-for="experience in resume.experience"
                      :key="experience.companyName"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import UserComponent from "./resume/user.vue";
    import ExperienceComponent from "./resume/experience.vue";

    @Component({
        components: {
            cUser: UserComponent,
            cExperience: ExperienceComponent
        }
    })
    export default class ResumePageComponent extends Vue {
        mounted() {
            this.$store.commit("ensureResumeIsLoaded")
        }

        get resume() {
            return this.$store.state.resume;
        }
    }
</script>
