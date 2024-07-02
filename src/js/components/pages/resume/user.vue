<template>
  <div class="mt-4">
    <div class="float-left photo d-none d-md-block">
      <!--suppress HtmlUnknownTarget -->
      <c-image :src="userPhotoUrl" class="mr-3 mb-3" style="border-radius: 10px" alt="Dmitrii Pechkovskii-Tsikorin"/>
    </div>
    <h2 @click="handleClick">{{ user.firstName }} {{ user.lastName }}</h2>
    <div>
      <b>{{ user.specialization }}</b><br>
      <!-- {{ ages }} years old. -->
      Live in {{ user.location }}
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
import {ApiResource} from "../../../classes/api-resource";

@Component({
  components: {
    cContact: ContactComponent,
    cImage: ImageComponent
  }
})
export default class UserComponent extends Vue {
  @Prop()
  private user!: any;

  counter: number = 1;

  get ages(): number {
    return moment().diff(moment(this.user.birthDate, "DD.MM.YYYY"), "years");
  }

  get userPhotoUrl(): string {
    return new ApiResource("resume", this.user.photo).url;
  }

  get isAdminMode() {
    return this.$store.state.isAdminMode;
  }

  handleClick() {
    if (this.counter++ >= 10 && !this.isAdminMode) {
      this.$store.commit("setAdminMode", true);
    }
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
