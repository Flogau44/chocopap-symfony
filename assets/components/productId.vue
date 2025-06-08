<template>
  <div>
    <!-- Affichage du panier -->
    <Cart
      v-if="isCartOpen"
      :cart="cart"
      :setCart="setCart"
      :resetCart="resetCart"
      :setIsCartOpen="closeCart"
    />

    <main class="w-full mb-5">
      <section class="mx-2 py-5 md:mx-20 md:py-24">
        <div
          class="flex flex-col items-center md:flex-row md:justify-center md:space-x-11"
        >
          <div>
            <img
              :src="product.image"
              class="w-96"
              :alt="product.title"
              width="500"
              height="500"
            />
          </div>
          <div class="flex flex-col">
            <h1 class="uppercase text-2xl text-yellow font-bold">
              {{ product.title }}
            </h1>
            <div class="pt-2 text-xl text-brown font-bold">
              {{ product.price }} €
            </div>
            <div class="py-4 md:py-10">{{ product.description }}</div>
            <div class="flex flex-col md:flex-row">
              <input
                type="number"
                class="my-1 mr-2 p-2 border-2 border-orange h-8 w-16 rounded-md bg-orange-700"
                v-model="quantity"
                min="1"
              />
              <button
                type="button"
                class="text-black bg-orange text-xs font-semibold uppercase mr-20 px-2 py-2 rounded-sm shadow-sm shadow-black transition duration-300 ease-in-out cursor-pointer md:mx-0 md:text-xs hover:bg-yellow hover:text-orange"
                @click="addToCart(product, quantity)"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-start mt-7">
          <h3 class="text-xl text-yellow font-semibold">Ingrédients</h3>
          <div class="mt-8">
            <ul v-if="product.ingredients">
              <li
                v-for="(ingredient, index) in formattedIngredients"
                :key="index"
              >
                {{ ingredient }}
              </li>
            </ul>
            <p v-else>Aucun ingrédient disponible pour ce produit.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Cart from "@/components/Cart.vue";
import { useRoute } from "vue-router";

export default {
  components: { Cart },
  setup() {
    const route = useRoute();
    const productId = ref(Number(route.params.id));
    const product = ref(null);
    const quantity = ref(1);
    const cartStore = useCartStore();
    const { isCartOpen, closeCart, cart, setCart, resetCart } = cartStore;

    onMounted(() => {
      fetch("/products.json")
        .then((res) => res.json())
        .then((data) => {
          product.value = data.find((p) => p.id === productId.value) || null;
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des produits :", error)
        );
    });

    const formattedIngredients = computed(() => {
      if (!product.value || !product.value.ingredients) return [];
      return typeof product.value.ingredients === "string"
        ? product.value.ingredients.split(". ")
        : product.value.ingredients;
    });

    const addToCart = (selectedProduct, quantity) => {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.id === selectedProduct.id
        );
        let updatedCart;

        if (existingProduct) {
          updatedCart = prevCart.map((item) =>
            item.id === selectedProduct.id
              ? { ...item, quantity: (item.quantity || 1) + quantity }
              : item
          );
        } else {
          updatedCart = [...prevCart, { ...selectedProduct, quantity }];
        }

        return updatedCart;
      });
    };

    return {
      product,
      quantity,
      addToCart,
      formattedIngredients,
      isCartOpen,
      closeCart,
      cart,
      setCart,
      resetCart,
    };
  },
};
</script>
