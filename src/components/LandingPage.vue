<template>
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
  <main>
    <router-view></router-view>
    <div class="m-4">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
        width="auto"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/12/11/d045e0a4-91e9-4f40-bb5c-6314da90150e.jpg.webp?ect=3g"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/12/8/a1617fc5-cd92-4fa8-aff7-127fd7c9fc93.jpg.webp?ect=3g"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/12/8/4caf8466-6b48-4af4-9e0f-f13aa624a7c1.jpg.webp?ect=3g"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="card h-50 m-4 card text-dark bg-light mb-3">
      <div class="m-4">
        <h5>Product</h5>
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
                    <h5 class="card-title">Rp. {{ barang.hargaBarang }}</h5>
                    <router-link
                      :to="{
                        name: 'barang.detailBarang',
                        params: { id: barang.id },
                      }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      Detail Barang</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  setup() {
    //reactive state
    let barangs = ref([]);
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://tubesuaswebbackend.itkitapro.com/api/barang")
        .then((response) => {
          //assign state posts with response data
          barangs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    //return
    return {
      barangs,
    };
  },
};
</script>