<template>
    <div class="container pb-4">
        <c-header/>
        <router-view/>
        <c-maintenance/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HeaderComponent from "./partials/header.vue";
    import MaintenanceComponent from "./pages/other/maintenance.vue";

    @Component({
        components: {
            cHeader: HeaderComponent,
            cMaintenance: MaintenanceComponent
        }
    })
    export default class IndexComponent extends Vue {

        // Gothic 1, hello!
        private adminModeKey: string = "bmarvinb";

        private keycodes: string[] = [];

        created() {
            document.onkeyup = (event) => {
                if (!(event instanceof KeyboardEvent)) {
                    return;
                }
                this.keycodes.push(event.key);
                if (this.keycodes.length > this.adminModeKey.length) {
                    this.keycodes.splice(0, this.keycodes.length - this.adminModeKey.length);
                }
                if (this.keycodes.length === this.adminModeKey.length &&
                    this.keycodes.join("").toLowerCase() === this.adminModeKey) {
                    console.log("Admin mode has been activated!");
                    this.$store.commit("setAdminMode", true);
                }
            };
        }
    }
</script>
