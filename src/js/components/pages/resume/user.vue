<template>
    <div>
        <div class="float-left photo d-none d-md-block">
            <!--suppress HtmlUnknownTarget -->
            <c-image :src="user.photo" class="mr-3 mb-3" alt="That's me!"/>
        </div>
        <h2>{{ user.lastName }} {{ user.firstName }} {{ user.middleName }}</h2>
        <div>
            <b>{{ user.specialization }}</b><br>
            {{ ages }} years old. Currently living in {{ user.location }}.
        </div>
        <div class="mt-2">
            <div v-for="contact in user.contacts">
                <c-contact :contact="contact"/>
            </div>
        </div>
        <br>
        <blockquote class="blockquote">
            {{ user.about }}
        </blockquote>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import moment from "moment";
    import ContactComponent from "./contact.vue";
    import ImageComponent from "../../partials/image.vue";

    @Component({
        components: {
            cContact: ContactComponent,
            cImage: ImageComponent
        }
    })
    export default class UserComponent extends Vue {
        @Prop()
        private user!: any;

        get ages(): number {
            return moment().diff(moment(this.user.birthDate, "DD.MM.YYYY"), "years");
        }
    }
</script>

<style scoped>
    .photo img {
        max-height: 300px;
    }

    blockquote {
        color: var(--gray);
        font-style: italic;
        padding: 6px 16px;
        border: none;
        quotes: "\201C" "\201D";
        display: inline-block;
        position: relative;
    }

    blockquote:before {
        content: open-quote;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
    }

    blockquote:after {
        content: close-quote;
        font-weight: bold;
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>
