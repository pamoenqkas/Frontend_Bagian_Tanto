<template>
  <head>
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js"
    />
    <!-- Bootstrap Icon -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />
    <!-- CSS only -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link
        :to="{ name: 'components.home' }"
        class="btn btn-outline-primary bi-house-fill"
        >Home</router-link
      >
      <div class="d-flex my-2 my-lg-0">
        <router-link
          v-if="user.namaUser"
          :to="{
            name: 'barang.keranjang',
            params: { id: user.idUser },
          }"
          class="btn btn-outline-primary bi-basket-fill me-2"
        >
        </router-link>
        <router-link
          v-if="!user.namaUser"
          :to="{ name: 'user.login' }"
          class="btn btn-warning me-2"
          >Login</router-link
        >
        <router-link
          v-if="!user.namaUser"
          :to="{ name: 'user.register' }"
          class="btn btn-info me-2"
          >Register</router-link
        >
        <!-- <p>{{ user.namaUser }}</p> -->
        <form @submit.prevent="logout" v-if="user.namaUser">
          <button type="submit" class="btn btn-outline-primary me-2">
            Logout
          </button>
        </form>
        <button
          type="button"
          class="btn btn-outline-primary bi-person-badge-fill me-2"
        >
          {{ user.namaUser }}
        </button>
      </div>
    </div>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>
    
    <script>
import { reactive, ref, onMounted } from "vue";
export default {
  setup() {
    const user = reactive({
      idUser: "",
      namaUser: "",
    });
    //mounted
    onMounted(() => {
      user.idUser = localStorage.getItem("id");
      user.namaUser = localStorage.getItem("name");
    });
    function logout() {
      user.namaUser = null;
    }
    //return
    return {
      user,
      logout,
    };
  },
};
</script>