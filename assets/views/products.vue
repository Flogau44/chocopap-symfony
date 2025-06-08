<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  addToCart: Function, // ✅ Récupère la fonction depuis `App.vue`
});

const showCategories = ref(true);
const showPrice = ref(true);
const showNote = ref(true);
const products = ref([]);

const filters = ref({
  minPrice: 1,
  maxPrice: 100,
  minNote: 0,
  maxNote: 5,
  selectedCategories: [],
});

const categories = ref([
  "blanc",
  "lait",
  "noir",
  "noix",
  "fruit",
  "caramel",
  "liqueur",
]);

onMounted(() => {
  fetch("/products.json")
    .then((res) => res.json())
    .then((data) => (products.value = data))
    .catch((err) => console.error("Erreur chargement des produits :", err));
});

// ✅ Correction du filtre
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const inPriceRange =
      product.price >= filters.value.minPrice &&
      product.price <= filters.value.maxPrice;
    const inNoteRange =
      product.note >= filters.value.minNote &&
      product.note <= filters.value.maxNote;
    const inCategory =
      filters.value.selectedCategories.length === 0 ||
      filters.value.selectedCategories.some(
        (category) => product.category[category] === true
      );

    return inPriceRange && inCategory && inNoteRange;
  });
});

// ✅ Correction de `toggleCategory`
const toggleCategory = (category) => {
  const selected = filters.value.selectedCategories.includes(category);
  filters.value.selectedCategories = selected
    ? filters.value.selectedCategories.filter((c) => c !== category)
    : [...filters.value.selectedCategories, category];
};

const toggleCategories = () => (showCategories.value = !showCategories.value);
const togglePrice = () => (showPrice.value = !showPrice.value);
const toggleNote = () => (showNote.value = !showNote.value);
</script>

<template>
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

        <div
          v-if="showCategories"
          class="flex flex-col pb-2 border-b-2 border-black"
        >
          <label>
            <input
              type="checkbox"
              class="filter-checkbox accent-orange-700"
              :checked="filters.selectedCategories.length === 0"
              @change="filters.selectedCategories = []"
            />
            Tous
          </label>
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
          <div class="flex items-center">
            <label>Prix min</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.minPrice"
              min="0"
              max="100"
            />
            <span>€</span>
          </div>
          <div class="flex items-center">
            <label>Prix max</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.maxPrice"
              min="0"
              max="100"
            />
            <span>€</span>
          </div>
        </div>

        <!-- Notes -->
        <h2 class="text-brown font-semibold">
          <span class="cursor-pointer" @click="toggleNote">
            {{ showNote ? "Notes -" : "Notes +" }}
          </span>
        </h2>

        <div v-if="showNote" class="flex flex-col pb-2 border-b-2 border-black">
          <div class="flex items-center">
            <label>Note min</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.minNote"
              min="0"
              max="5"
            />
          </div>
          <div class="flex items-center">
            <label>Note max</label>
            <input
              type="number"
              class="filter-input"
              v-model="filters.maxNote"
              min="0"
              max="5"
            />
          </div>
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
          <router-link
            :to="{ name: 'ProductDetail', params: { id: Number(product.id) } }"
            :title="product.title"
          >
            <img
              :src="product.image"
              :alt="product.title"
              width="300"
              height="300"
            />
          </router-link>
          <h2 class="titleChoco">{{ product.title }}</h2>
          <p class="font-semibold flex justify-center">{{ product.price }} €</p>
          <p class="font-light flex justify-center">
            Note : {{ product.note }} /5
          </p>
          <button class="addCart" @click="props.addToCart(product)">
            Ajouter au panier
          </button>
        </div>
      </section>
    </section>
  </main>
</template>
