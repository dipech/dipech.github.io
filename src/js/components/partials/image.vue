<template>
    <!--suppress HtmlUnknownAttribute, RequiredAttributes -->
    <img v-lazy="src" :alt="alt" :class="{'cursor-pointer': zoomable}" v-viewer="viewerOptions">
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class ImageComponent extends Vue {
        @Prop()
        private src!: string;

        @Prop()
        private alt!: string;

        @Prop({ default: true})
        private zoomable!: boolean;

        get viewerOptions() {
            if (!this.zoomable) {
                // Dirty hack for preventing full-screen viewer from showing
                return {
                    "url": "data-source",
                    "z-index": -9999999
                };
            }
            return {
                "button": false,
                "navbar": false,
                "title": false,
                "toolbar": false,
                "tooltip": false,
                "movable": true,
                "zoomable": true,
                "rotatable": false,
                "scalable": false,
                "transition": true,
                "fullscreen": true,
                "keyboard": false,
                "z-index": 999999
            }
        }

    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
