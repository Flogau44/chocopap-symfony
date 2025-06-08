<template>
  <main class="min-w-80 flex-grow">
    <section class="relative p-0 m-0">
      <!-- Carousel optimisé -->
      <div
        v-for="(img, index) in images"
        :key="index"
        :class="[
          'carouselSlide',
          slideIndex === index + 1 ? 'block' : 'hidden',
        ]"
      >
        <div class="relative w-full h-[700px]">
          <img
            :src="`../images/${img}`"
            :alt="`Accueil${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Indicateurs du carousel -->
      <div
        class="absolute z-40 bottom-5 left-0 w-full h-3 flex justify-center space-x-1 md:h-5"
      >
        <button
          v-for="dot in [1, 2, 3]"
          :key="dot"
          :class="[
            'carouselDot bg-yellow hover:bg-brown-700 transition duration-700 ease-in-out rounded-full w-3 cursor-pointer md:w-5',
            slideIndex === dot ? 'focus:bg-yellow' : '',
          ]"
          @click="setSlideIndex(dot)"
        ></button>
      </div>

      <!-- Bouton vers la boutique -->
      <div
        class="absolute z-40 top-3/4 left-2/4 -translate-x-1/2 -translate-y-3/4 md:bottom-11"
      >
        <router-link to="/products" title="Vers la page boutique de ce site">
          <span
            class="text-black bg-orange text-sm font-semibold uppercase px-5 py-3 rounded-md shadow-sm shadow-black transition duration-300 ease-in-out md:text-2xl hover:bg-yellow hover:text-orange"
          >
            Voir la boutique
          </span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const slideIndex = ref(1);
    const images = ref(["accueil1.jpg", "accueil2.jpg", "accueil3.jpg"]);

    onMounted(() => {
      setInterval(() => {
        slideIndex.value = slideIndex.value === 3 ? 1 : slideIndex.value + 1;
      }, 5000);
    });

    const setSlideIndex = (index) => {
      slideIndex.value = index;
    };

    return {
      slideIndex,
      images,
      setSlideIndex,
    };
  },
};
</script>
