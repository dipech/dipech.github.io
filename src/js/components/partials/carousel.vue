<template>
    <div>
        <div class="owl-carousel owl-theme mt-2">
            <div v-for="image in images">
                <!--suppress HtmlUnknownTarget -->
                <img :src="image.url" class="image" alt="Image!">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {ApiResource} from "../../classes/api-resource";
    import jquery from "jquery";

    @Component
    export default class CarouselComponent extends Vue {

        private static isIntervalSet: boolean = false;

        @Prop()
        private images!: ApiResource[];

        mounted() {
            if (!CarouselComponent.isIntervalSet) {
                setInterval(() => {
                    (jquery(".owl-carousel:not(.owl-loaded)") as any).owlCarousel({
                        loop: true,
                        margin: 15,
                        autoplay: true,
                        autoWidth: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true,
                        dots: false,
                        responsive: {
                            0: {
                                items: 1
                            },
                            600: {
                                items: 3
                            },
                            1000: {
                                items: 5
                            }
                        }
                    })
                }, 100);
                CarouselComponent.isIntervalSet = true;
            }
        }

    }
</script>

<style scoped>
    .image {
        width: auto !important;
        max-height: 200px;
    }
</style>
