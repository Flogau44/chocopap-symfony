<template>
  <footer
    class="bg-brown px-10 pt-5 pb-20 flex flex-col gap-2 md:grid md:grid-rows-2 md:grid-flow-col md:justify-between md:gap-y-2"
  >
    <div>
      <h1 class="text-5xl text-yellow">Choco Pap</h1>
    </div>
    <div class="text-white font-PTserif md:max-w-72">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <div>
      <h1 class="text-5xl text-yellow">Contact</h1>
    </div>
    <div class="text-white font-PTserif">
      <span class="text-orange font-bold">Adresse:</span> 51 rue du chocolat
      75000 Paris<br />
      <span class="text-orange font-bold">Téléphone:</span> 1 23 45 67 89<br />
      <span class="text-orange font-bold">Horaires:</span> 9h00-17h00 du Lundi
      au vendredi
    </div>
    <div></div>
    <div>
      <a href="#" title="Vers la page facebook">
        <span class="fa-stack fa-lg text-orange">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
        </span>
      </a>
      <a href="#" title="Vers la page instagram">
        <span class="fa-stack fa-lg text-orange">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
        </span>
      </a>
      <a href="#" title="Vers la page twitter">
        <span class="fa-stack fa-lg text-orange">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
        </span>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
