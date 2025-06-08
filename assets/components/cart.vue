<template>
  <section class="relative">
    <div
      class="bg-yellow border-2 border-orange absolute top-0 left-0 right-0 z-50 flex flex-col space-y-2 w-full md:left-auto md:right-0 md:w-[500px]"
    >
      <div class="bg-brown flex flex-row justify-between px-10 py-3">
        <button
          type="button"
          class="w-7 cursor-pointer"
          aria-label="Fermer le panier"
          @click="setIsCartOpen(false)"
        >
          <i class="fa-solid fa-times text-yellow fa-2xl hover:text-orange"></i>
        </button>
        <h2 class="text-2xl font-semibold text-yellow">PANIER</h2>
      </div>

      <div>
        <ul class="overflow-y-auto h-[400px] flex flex-col space-y-2">
          <li
            v-for="item in cart"
            :key="item.id"
            class="flex flex-row space-x-2 items-center px-6"
          >
            <img :src="item.image" :alt="item.title" width="50" height="50" />
            <span>{{ item.title }} - {{ item.price }} €</span>
            <span>x {{ item.quantity }}</span>
            <button
              class="text-red-600 hover:text-red-800 cursor-pointer"
              @click="removeItem(item.id)"
            >
              Supprimer
            </button>
          </li>
        </ul>

        <div class="bg-brown py-4 flex flex-col items-center gap-2">
          <h3 class="text-xl text-orange">
            <div>
              Total: <span>{{ totalPrice }} €</span>
            </div>
          </h3>
          <button
            type="button"
            class="text-black bg-orange text-xs font-semibold uppercase px-2 py-2 rounded-sm shadow-sm shadow-black transition duration-300 ease-in-out cursor-pointer md:text-xs hover:bg-yellow hover:text-orange"
            @click="resetCart"
          >
            Réinitialiser le panier
          </button>
          <button
            type="button"
            class="text-black bg-orange text-xs font-semibold uppercase px-2 py-2 rounded-sm shadow-sm shadow-black transition duration-300 ease-in-out cursor-pointer md:text-xs hover:bg-yellow hover:text-orange"
            :disabled="cart.length === 0"
          >
            Valider le panier
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "../store/store"; // Utilisation de Pinia/Vuex

export default {
  name: "Cart",
  setup() {
    const cartStore = useCartStore();
    const cart = ref(cartStore.cart);
    const setIsCartOpen = cartStore.setIsCartOpen;
    const resetCart = cartStore.resetCart;

    const totalPrice = computed(() => {
      return cart.value.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    });

    const removeItem = (id) => {
      cart.value = cart.value
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity && item.quantity > 0);
    };

    return {
      cart,
      totalPrice,
      setIsCartOpen,
      resetCart,
      removeItem,
    };
  },
};
</script>
