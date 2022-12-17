<template>
  <div class="card h-50 m-4 card text-dark bg-light mb-3">
    <div class="m-4">
      <h5>Product</h5>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div width="100">
                <img
                  v-bind:src="barang.gambarBarang"
                  class="card-img-top"
                  alt="asd"
                  width="50"
                />
              </div>
              <div v-for="(review, id) in reviews" :key="id">
                <div class="col">
                  <p class="card-title">{{ review.namaUser }}</p>
                  <vue3-star-ratings
                    v-model="review.rating"
                    :showControl="false"
                    :disableClick="false"
                  />
                  <!-- <AwesomeVueStarRating :star="this.star" ></AwesomeVueStarRating> -->

                  <!-- <p class="card-title">{{ review.rating }}</p> -->
                </div>
              </div>
              <label for="content" class="form-label">Masukkan Rating</label>
              <vue3-star-ratings
                v-model="tempRating.rating"
                :disableClick="false"
              />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <!-- <input
                    class="form-control"
                    type="number"
                    v-model="tempRating.rating"
                    placeholder="Masukkan rating"
                  /> -->
                </div>
                <button type="submit" class="btn btn-primary">
                  SIMPAN REVIEW
                </button>
              </form>
              <br />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ barang.namaBarang }}</h3>
              <h4 class="card-title">{{ barang.jumlahBarang }}</h4>
              <h1 class="card-title">{{ barang.hargaBarang }}</h1>
              <p class="card-text">
                {{ barang.deskripsiBarang }}
              </p>
              <div style="display: flex">
                <button
                  class="btn btn-primary"
                  @click="tempKuantitas.kuantitas--"
                  style="margin-right: 10px"
                >
                  -
                </button>
                <p>{{ tempKuantitas.kuantitas }}</p>
                <button
                  class="btn btn-primary"
                  @click="tempKuantitas.kuantitas++"
                  style="margin-left: 10px"
                >
                  +
                </button>
              </div>
              <br />
              <form @submit.prevent="masukKeranjang">
                <button type="submit" class="btn btn-primary">
                  Masukkan Ke Keranjang
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const tempRating = reactive({
      rating: 0,
    });
    const tempKuantitas = reactive({
      kuantitas: 1,
    });
    const route = useRoute();
    const id = route.params.id;
    //state barang
    const barang = reactive({
      namaBarang: "",
      hargaBarang: "",
      deskripsiBarang: "",
      gambarBarang: "",
    });
    let reviews = ref([]);
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`https://tubesuaswebbackend.itkitapro.com/api/barang/${id}`)
        .then((response) => {
          //assign state posts with response data
          barang.namaBarang = response.data.data.namaBarang;
          barang.hargaBarang = response.data.data.hargaBarang;
          barang.deskripsiBarang = response.data.data.deskripsiBarang;
          barang.gambarBarang = response.data.data.gambarBarang;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      axios
        .get(
          `https://tubesuaswebbackend.itkitapro.com/api/reviewByIdBarang/${id}`
        )
        .then((response) => {
          //assign state posts with response data
          reviews.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function decrement() {
      tempKuantitas.kuantitas--;
    }
    function increment() {
      tempKuantitas.kuantitas++;
    }
    function store() {
      let rating = tempRating.rating;
      axios
        .post("https://tubesuaswebbackend.itkitapro.com/api/review", {
          rating: rating,
          idUser: localStorage.getItem("id"),
          namaUser: localStorage.getItem("name"),
          gambarBarang: barang.gambarBarang,
          kuantitas: 1,
          idBarang: id,
        })
        .then((response) => {
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
    function masukKeranjang() {
      axios
        .post("https://tubesuaswebbackend.itkitapro.com/api/keranjang", {
          idBarang: id,
          idUser: localStorage.getItem("id"),
          gambarBarang: barang.gambarBarang,
          kuantitas: tempKuantitas.kuantitas,
          namaBarang: barang.namaBarang,
        })
        .then((response) => {
          //redirect ke post index
          router.push({
            name: "barang.keranjang",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    //return
    return {
      reviews,
      barang,
      validation,
      router,
      store,
      tempRating,
      tempKuantitas,
      masukKeranjang,
      decrement,
      increment,
    };
  },
};
</script>
<style lang="scss">
.dot {
  height: 18px;
  width: 18px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid #fff;
  top: -48px;
  left: 186px;
  z-index: 1000;
}

.name {
  margin-top: -21px;
  font-size: 18px;
}

.fw-500 {
  font-weight: 500 !important;
}

.start {
  color: green;
}

.stop {
  color: red;
}

.rate {
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
}

.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}

.rating > input {
  display: none;
}

.rating > label {
  position: relative;
  width: 1em;
  font-size: 30px;
  font-weight: 300;
  color: #FFD600;
  cursor: pointer;
}

.rating > label::before {
  content: "\2605";
  position: absolute;
  opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
  opacity: 1 !important;
}

.rating > input:checked ~ label:before {
  opacity: 1;
}

.rating:hover > input:checked ~ label:before {
  opacity: 0.4;
}

.rating-submit {
  border-radius: 15px;
  color: #fff;
  height: 49px;
}

.rating-submit:hover {
  color: #fff;
}
/* asdas */

.star {
  color: red;
}
.star.active {
  color: red;
}
.list,
.list.disabled {
  &:hover {
    .star {
      color: red !important;
    }
    .star.active {
      color: red;
    }
  }
}
</style>