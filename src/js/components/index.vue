<template>
    <div class="container">
        <c-header/>
        <c-alerts/>
        <router-view/>
        <c-footer/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HeaderComponent from "./partials/header.vue";
    import FooterComponent from "./partials/footer.vue";
    import AlertsComponent from "./partials/alerts.vue";

    @Component({
        components: {
            cHeader: HeaderComponent,
            cFooter: FooterComponent,
            cAlerts: AlertsComponent
        }
    })
    export default class IndexComponent extends Vue {
    }
</script>
