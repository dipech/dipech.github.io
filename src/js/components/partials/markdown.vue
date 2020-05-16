<template>
    <div>
        <vue-markdown :emoji="false">{{ text }}</vue-markdown>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import VueMarkdown from "vue-markdown";
    import {Prop} from "vue-property-decorator";

    @Component({
        components: {
            vueMarkdown: VueMarkdown
        }
    })
    export default class MarkdownComponent extends Vue {

        @Prop()
        private text!: string;

    }
</script>

<style scoped>

</style>
