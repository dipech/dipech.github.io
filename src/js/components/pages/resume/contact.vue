<template>
    <div>
        <!--suppress HtmlUnknownTarget -->
        <c-image :src="iconUrl" class="icon" alt="icon"/>
        <a :href="href" target="_blank" rel="nofollow">{{ contact.value }}</a>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import ImageComponent from "../../partials/image.vue";
    import {ApiResource} from "../../../classes/api-resource";

    @Component({
        components: {
            cImage: ImageComponent
        }
    })
    export default class ContactComponent extends Vue {
        @Prop()
        private contact!: any;

        get href(): string {
            let value = this.contact.value;
            if (this.contact.type === "phone") {
                value = value.replace(/[^\d]/g, "");
            }
            let prefix = "";
            switch (this.contact.type) {
                case "phone":
                    prefix = "tel:";
                    break;
                case "email":
                    prefix = "mailto:";
                    break;
            }
            return prefix + value;
        }

        get iconUrl(): string {
            return new ApiResource("resume", this.contact.icon).url;
        }
    }
</script>

<style scoped>
    .icon {
        display: inline-block;
        max-height: 15px;
        max-width: 15px;
    }
</style>
