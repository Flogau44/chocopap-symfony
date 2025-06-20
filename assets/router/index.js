import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import NotFound from "../views/NotFound.vue";
import Products from "../views/products.vue";
import ProductDetail from "../views/productId.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    props: true,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
