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
  <main>
    <div class="card h-50 m-4 card text-dark bg-light mb-3">
      <div class="m-4">
        <h1>Keranjang</h1>
        <div class="m-4">
          <div class="row row-cols-1 row-cols-md-6 g-4">
            <div v-for="(barang, id) in barangs" :key="id">
              <div class="col">
                <div class="card">
                  <img
                    v-bind:src="barang.gambarBarang"
                    class="card-img-top"
                    alt="asd"
                    width="200"
                    rounded
                  />
                  <div class="card-body">
                    <h3 class="card-subtitle">{{ barang.namaBarang }}</h3>
                    <h5 class="card-title">
                      Kuantitas: {{ barang.kuantitas }}
                    </h5>
                    <button
                      class="btn btn-sm btn-danger ml-1"
                      @click="hapus(barang.id)"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <form @submit.prevent="bayar">
              <button type="submit" class="btn btn-primary">Bayar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const user = reactive({
      idUser: "",
      namaUser: "",
    });
    //reactive state
    let barangs = ref([]);
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //mounted
    onMounted(() => {
      user.idUser = localStorage.getItem("id");
      //get API from Laravel Backend
      axios
        .get(
          `https://tubesuaswebbackend.itkitapro.com/api/keranjangByIdUser/${user.idUser}`
        )
        .then((response) => {
          //assign state posts with response data
          barangs.value = response.data.data;
        });
      // .catch((error) => {
      //   console.log(error.response.data);
      // });
    });
    function hapus(id) {
      axios
        .delete(
          `https://tubesuaswebbackend.itkitapro.com/api/keranjang/${id}`,
          {}
        )
        .then(() => {
          //redirect ke post index
          router.push({
            name: "components.home",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    function bayar() {
      router.push({
        name: "barang.sudahTerbayar",
      });
    }
    //return
    return {
      barangs,
      bayar,
      hapus,
    };
  },
};
</script>