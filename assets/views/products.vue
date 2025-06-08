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

    <main class="mb-5">
      <div class="py-4 flex justify-center">
        <h1 class="text-5xl text-brown">BOUTIQUE</h1>
      </div>

      <section class="grid grid-cols-1 md:flex md:flex-grow">
        <!-- Section Filtres -->
        <aside class="flex flex-col space-y-5 px-8 m-0 md:w-[300px]">
          <div class="font-bold text-2xl">FILTRE</div>

          <!-- Catégories -->
          <h2 class="text-brown font-semibold">
            <span class="cursor-pointer" @click="toggleCategories">
              {{ showCategories ? "Catégories -" : "Catégories +" }}
            </span>
          </h2>

          <div v-if="showCategories" class="pb-2 border-b-2 border-black">
            <label>
              <input
                type="checkbox"
                class="filter-checkbox accent-orange-700"
                :checked="filters.selectedCategories.length === 0"
                @change="filters.selectedCategories = []"
              />
              Tous
            </label>
            <br />
            <label v-for="category in categories" :key="category">
              <input
                type="checkbox"
                class="filter-checkbox accent-orange-700"
                :checked="filters.selectedCategories.includes(category)"
                @change="toggleCategory(category)"
              />
              Chocolat {{ category }}
            </label>
          </div>

          <!-- Prix -->
          <h2 class="text-brown font-semibold">
            <span class="cursor-pointer" @click="togglePrice">
              {{ showPrice ? "Prix -" : "Prix +" }}
            </span>
          </h2>

          <div v-if="showPrice" class="pb-2 border-b-2 border-black">
            <label>Prix min</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.minPrice"
              min="0"
              max="100"
            />
            <label>Prix max</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.maxPrice"
              min="0"
              max="100"
            />
          </div>

          <!-- Notes -->
          <h2 class="text-brown font-semibold">
            <span class="cursor-pointer" @click="toggleNote">
              {{ showNote ? "Notes -" : "Notes +" }}
            </span>
          </h2>

          <div v-if="showNote" class="pb-2 border-b-2 border-black">
            <label>Note min</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.minNote"
              min="0"
              max="5"
            />
            <label>Note max</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.maxNote"
              min="0"
              max="5"
            />
          </div>
        </aside>

        <!-- Section Produits -->
        <section
          class="flex flex-col justify-center items-center gap-y-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 grow"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="m-3 flex flex-col place-self-center items-center justify-start"
          >
            <router-link :to="`/boutique/${product.id}`">
              <img
                :src="product.image"
                :alt="product.title"
                width="300"
                height="300"
              />
            </router-link>
            <h2 class="titleChoco">{{ product.title }}</h2>
            <p class="font-semibold flex justify-center">
              {{ product.price }} €
            </p>
            <p class="font-light flex justify-center">
              Note : {{ product.note }} /5
            </p>
            <button class="addCart" @click="addToCart(product)">
              Ajouter au panier
            </button>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../store/store";
import Cart from "../components/cart.vue";

export default {
  components: { Cart },
  setup() {
    const showCategories = ref(true);
    const showPrice = ref(true);
    const showNote = ref(true);
    const products = ref([]);
    const cartStore = useCartStore();
    const isCartOpen = ref(cartStore.isCartOpen);
    const cart = ref(cartStore.cart);
    const setCart = cartStore.setCart;
    const resetCart = cartStore.resetCart;
    const closeCart = cartStore.closeCart;

    const filters = ref({
      minPrice: 1,
      maxPrice: 100,
      minNote: 0,
      maxNote: 5,
      selectedCategories: [],
    });

    const categories = ref([
      "Blanc",
      "Lait",
      "Noir",
      "Noix",
      "Fruit",
      "Caramel",
      "Liqueur",
    ]);

    onMounted(() => {
      fetch("/products.json")
        .then((res) => res.json())
        .then((data) => (products.value = data))
        .catch((err) => console.error("Erreur chargement des produits :", err));
    });

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        return (
          product.price >= filters.value.minPrice &&
          product.price <= filters.value.maxPrice &&
          (filters.value.selectedCategories.length === 0 ||
            filters.value.selectedCategories.some(
              (category) => product.category[category]
            )) &&
          product.note >= filters.value.minNote &&
          product.note <= filters.value.maxNote
        );
      });
    });

    const addToCart = (product) => {
      const existingProduct = cart.value.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
    };

    const toggleCategory = (category) => {
      const selected = filters.value.selectedCategories.includes(category);
      filters.value.selectedCategories = selected
        ? filters.value.selectedCategories.filter((c) => c !== category)
        : [...filters.value.selectedCategories, category];
    };

    const toggleCategories = () =>
      (showCategories.value = !showCategories.value);
    const togglePrice = () => (showPrice.value = !showPrice.value);
    const toggleNote = () => (showNote.value = !showNote.value);

    return {
      showCategories,
      showPrice,
      showNote,
      filters,
      categories,
      products,
      filteredProducts,
      addToCart,
      toggleCategory,
      toggleCategories,
      togglePrice,
      toggleNote,
      isCartOpen,
      cart,
      setCart,
      resetCart,
      closeCart,
    };
  },
};
</script>
