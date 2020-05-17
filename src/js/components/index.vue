<template>
    <div class="container">
        <c-header/>
        <router-view/>
        <c-footer/>
        <c-maintenance/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HeaderComponent from "./partials/header.vue";
    import FooterComponent from "./partials/footer.vue";
    import MaintenanceComponent from "./pages/other/maintenance.vue";

    @Component({
        components: {
            cHeader: HeaderComponent,
            cFooter: FooterComponent,
            cMaintenance: MaintenanceComponent
        }
    })
    export default class IndexComponent extends Vue {
    }
</script>
