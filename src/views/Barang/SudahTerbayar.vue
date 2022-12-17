<template>
  <h1>Barang sudah terbayar</h1>

  <form @submit.prevent="goHome">
    <button type="submit" class="btn btn-primary">Home</button>
  </form>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    //vue router
    const router = useRouter();
    function goHome() {
      router.push({
        name: "components.home",
      });
    }
    //return
    return {
      goHome,
    };
  },
};
</script>