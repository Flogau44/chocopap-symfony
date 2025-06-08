<script setup>
import { ref, computed } from "vue";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Cart from "./components/cart.vue";
import { RouterView } from "vue-router";

const isCartOpen = ref(false);
const cart = ref([]);

const openCart = () => (isCartOpen.value = true);
const closeCart = () => (isCartOpen.value = false);

const addToCart = (product, quantity = 1) => {
  const existingProductIndex = cart.value.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    cart.value[existingProductIndex].quantity += quantity; // ✅ Corrigé pour bien incrémenter la quantité
  } else {
    cart.value.push({ ...product, quantity });
  }
};

const resetCart = () => (cart.value = []);
const removeItem = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id);
};

// ✅ Correction du compteur cartQuantity pour additionner toutes les quantités
const cartQuantity = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
);
</script>

<template>
  <Header :openCart="openCart" :cartQuantity="cartQuantity" />
  <Cart
    v-if="isCartOpen"
    :cart="cart"
    :setIsCartOpen="closeCart"
    :resetCart="resetCart"
    :removeItem="removeItem"
  />
  <RouterView :addToCart="addToCart" />
  <Footer />
</template>
