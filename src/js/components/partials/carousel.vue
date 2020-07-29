<template>
    <div>
        <c-slider :auto-width="true" :mouse-drag="true" :loop="false" :gutter="15" :controls="false"
                  :touch="true" :prevent-scroll-on-touch="true">
            <div v-for="image in images">
                <!--suppress HtmlUnknownTarget -->
                <c-image :src="image.url" class="carousel-image" alt="Image!"/>
            </div>
        </c-slider>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {ApiResource} from "../../classes/api-resource";
    import ImageComponent from "./image.vue";
    import VueTinySlider from "vue-tiny-slider";

    @Component({
        components: {
            cImage: ImageComponent,
            cSlider: VueTinySlider
        }
    })
    export default class CarouselComponent extends Vue {

        @Prop()
        private images!: ApiResource[];

    }
</script>

<style>
    .carousel-image {
        border-radius: 5px;
        border: 1px solid lightgray;
        height: 200px;
    }

    .tns-nav {
        text-align: center;
    }

    .tns-nav > button {
        width: 9px;
        height: 9px;
        padding: 0;
        margin: 0 5px;
        border-radius: 50%;
        background: #ddd;
        border: 0;
    }

    .tns-nav > button:focus,
    .tns-item:focus {
        outline: none;
        box-shadow: none;
    }

    .tns-nav > button.tns-nav-active {
        background: #999;
    }
</style>
