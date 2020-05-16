<template>
    <div class="container">
        <c-header/>
        <router-view/>
        <c-footer/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import HeaderComponent from "./partials/header.vue";
    import FooterComponent from "./partials/footer.vue";

    @Component({
        components: {
            cHeader: HeaderComponent,
            cFooter: FooterComponent
        }
    })
    export default class IndexComponent extends Vue {
    }
</script>
