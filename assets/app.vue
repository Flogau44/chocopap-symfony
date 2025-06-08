<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
</template>
