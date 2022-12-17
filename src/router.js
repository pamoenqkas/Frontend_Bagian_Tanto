//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "beranda",
    component: () => import("@/components/Navigation.vue"),
    children: [
      {
        path: "/",
        name: "components.home",
        component: () => import("@/components/LandingPage.vue")
      },
      {
        path: "/home",
        name: "components.home",
        component: () => import("@/components/LandingPage.vue")
      },
      {
        path: "/detailBarang/:id",
        name: "barang.detailBarang",
        component: () => import("@/views/Barang/DetailBarang.vue")
      },
      {
        path: "/keranjang/:id",
        name: "barang.keranjang",
        component: () => import("@/views/Barang/Keranjang.vue")
      },
      {
        path: "/sudahTerbayar",
        name: "barang.sudahTerbayar",
        component: () => import("@/views/Barang/SudahTerbayar.vue")
      },
      {
        path: "/register",
        name: "user.register",
        component: () => import("@/views/User/Register.vue")
      },
      {
        path: "/login",
        name: "user.login",
        component: () => import("@/views/User/Login.vue")
      }
    ]
  }
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes // config routes
});

export default router;
