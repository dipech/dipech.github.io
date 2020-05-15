<template>
    <div>
        <c-alert v-for="(alert, alertIndex) in acceptableAlerts"
                 :type="alert.type" :index="alertIndex" :key="alertIndex">
            {{ alert.text }}
        </c-alert>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import AlertComponent from "./alert.vue";

    @Component({
        components: {
            cAlert: AlertComponent
        }
    })
    export default class AlertsComponent extends Vue {
        get allAlerts() {
            return this.$store.state.alerts;
        }

        get acceptableAlerts() {
            return this.allAlerts.filter((alert: any) =>
                !alert.hasOwnProperty("page") || this.$route.path.startsWith(alert.page));
        }
    }
</script>

<style scoped>

</style>