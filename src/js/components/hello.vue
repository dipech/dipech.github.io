<template>
    <div>
        <div class="greeting">Hello {{message}}{{exclamationMarks}}</div>
        <button class="btn btn-outline-secondary"
                @click="decrement"
        >-</button>
        {{counter}}
        <button class="btn btn-outline-secondary"
                @click="increment"
        >+</button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop as Prop} from "vue-property-decorator";

    @Component
    export default class HelloComponent extends Vue {

        @Prop()
        private message!: string;

        @Prop()
        private counter!: number;

        decrement(): void {
            if (this.counter > 1) {
                this.counter--;
            }
        }

        increment(): void {
            this.counter++;
        }

        get exclamationMarks() {
            return Array(this.counter + 1).join("!");
        }

    }
</script>

<style>
    .greeting {
        font-size: 20px;
    }
</style>
