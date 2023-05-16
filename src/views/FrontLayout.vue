<template>
  <NavbarComponent />
  <RouterView />
  <FooterComponent />
</template>

<script>
import { RouterView } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  data() {
    return {
      footerSticky: false,
    };
  },
  components: {
    RouterView,
    NavbarComponent,
    FooterComponent,
  },
};
</script>
