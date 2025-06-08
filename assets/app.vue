<script setup>
import { ref } from "vue";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Cart from "./components/cart.vue";
import { RouterView } from "vue-router";

const isCartOpen = ref(false);

const openCart = () => (isCartOpen.value = true);
const closeCart = () => (isCartOpen.value = false);
const cart = ref([]);
const resetCart = () => (cart.value = []);
const removeItem = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id);
};
</script>

<template>
  <Header :openCart="openCart" :cartQuantity="cart.length" />
  <Cart
    v-if="isCartOpen"
    :cart="cart"
    :setIsCartOpen="closeCart"
    :resetCart="resetCart"
    :removeItem="removeItem"
  />
  <RouterView />
  <Footer />
</template>
