import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [], // Liste des produits dans le panier
    isCartOpen: false, // État d'ouverture du panier
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    RESET_CART(state) {
      state.cart = [];
    },
    TOGGLE_CART(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },
    resetCart({ commit }) {
      commit("RESET_CART");
    },
    toggleCart({ commit }) {
      commit("TOGGLE_CART");
    },
  },
  getters: {
    cartQuantity(state) {
      return state.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    },
    cartTotalPrice(state) {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});
