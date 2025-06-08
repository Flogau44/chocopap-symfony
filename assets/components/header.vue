<template>
  <header class="bg-brown w-full">
    <nav class="mx-auto p-6 font-poppins flex justify-between items-center">
      <router-link to="/" title="Page d'accueil">
        <img src="/images/logo.png" alt="logo" width="64" height="64" />
      </router-link>

      <ul
        class="hidden md:flex md:flex-row md:items-center md:text-yellow md:text-2xl md:font-semibold"
      >
        <li class="py-4 md:py-0 md:mr-6">
          <router-link to="/" class="hover:text-orange">Accueil</router-link>
        </li>
        <li class="py-4 md:py-0 md:mr-6">
          <router-link to="/boutique" class="hover:text-orange"
            >Boutique</router-link
          >
        </li>
        <li class="py-4 flex flex-row items-center space-x-2 md:mr-6">
          <div id="cartQuantityNavDesktop" class="text-blue">
            {{ cartQuantity }}
          </div>
          <button type="button" class="cursor-pointer" @click="openCart">
            <i class="fa-solid fa-cart-shopping hover:text-orange"></i>
          </button>
        </li>
      </ul>

      <button
        class="cursor-pointer w-7 transition-all duration-500 md:hidden"
        @click="toggleMenu"
      >
        <i
          :class="
            menuOpen
              ? 'fas fa-times fa-2xl text-amber-300'
              : 'fas fa-bars fa-2xl text-amber-300'
          "
        ></i>
      </button>
    </nav>

    <!-- Menu mobile -->
    <div
      class="w-full bg-brown text-yellow text-2xl font-semibold md:hidden"
      v-show="menuOpen"
    >
      <ul class="flex flex-col items-center">
        <li class="py-4">
          <router-link
            to="/"
            class="underline hover:text-orange"
            @click="menuOpen = false"
            >Accueil</router-link
          >
        </li>
        <li class="py-4">
          <router-link
            to="/boutique"
            class="underline hover:text-orange"
            @click="menuOpen = false"
            >Boutique</router-link
          >
        </li>
        <li class="py-4 flex flex-row space-x-2">
          <div id="cartQuantityNavMobile" class="text-blue">
            {{ cartQuantity }}
          </div>
          <button type="button" class="cursor-pointer" @click="handleCart">
            <i class="fa-solid fa-cart-shopping hover:text-orange"></i>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../store/store.js";

export default {
  name: "Header",
  setup() {
    const menuOpen = ref(false);
    const cartStore = useCartStore(); // Store Pinia / Vuex pour le panier
    const cartQuantity = computed(() => {
      return cartStore.cart.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );
    });

    // Persistance du panier dans localStorage
    onMounted(() => {
      localStorage.setItem("cartQuantity", cartQuantity.value.toString());
    });

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const openCart = () => {
      cartStore.openCart();
    };

    const handleCart = () => {
      menuOpen.value = false;
      openCart();
    };

    return {
      menuOpen,
      cartQuantity,
      toggleMenu,
      openCart,
      handleCart,
    };
  },
};
</script>
