<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Index component
            </div>
            <div class="card-body">
                Hello {{name}}!
                <label>Name: <input v-model="name" type="text"></label>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                Hello component
            </div>
            <div class="card-body">
                <hello :message="name" :counter="5"/>
            </div>
        </div>
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
