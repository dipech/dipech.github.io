<template>
    <div>
        <div>Hello {{name}}!</div>
        <hello :message="name" :counter="5"/>
        <label>Name: <input v-model="name" type="text"></label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop as Prop} from "vue-property-decorator";
    import HelloComponent from "./hello.vue";

    @Component({
        components: {
            hello: HelloComponent
        }
    })
    export default class IndexComponent extends Vue {
        @Prop()
        private name = "World";
    }
</script>
