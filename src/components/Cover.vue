<template>
  <div class="cover" v-if="movie">
    <div
      class="cover-img"
      :style="{ 'background-image': `url('${coverUrl}')` }"
    ></div>
    <div class="cover-title">
      <h1>{{ movie.title }}</h1>
    </div>
    <div class="cover-overview">
      {{ movie.overview }}
    </div>
    <button class="cover-info" @click.prevent="handleClick">More info</button>
  </div>
  <ModalDetal
    v-if="showModal"
    :movie="movie"
    @closeDetail="closeModalDetail"
    @addLike="toggleIsLike"
    @addFav="toggleAddFav"
    @removeFav="toggleRemoveFav"
  />
</template>

<script>
import { ref } from "@vue/reactivity";
import getMovies from "../composables/getMovies";
import ModalDetal from "./ModalDetal.vue";
import { onMounted } from "@vue/runtime-core";

export default {
  components: { ModalDetal },
  setup() {
    const { getTrend, trend } = getMovies();
    const showModal = ref(false);
    const randomNum = ref(Number);
    const coverUrl = ref("");
    const movie = ref({});
    const moviePost = ref("");

    randomNum.value = Math.floor(Math.random() * 20);

    onMounted(async () => {
      await getTrend();
      coverInfo();
    });

    const coverInfo = () => {
      movie.value = trend.value[randomNum.value];
      moviePost.value = movie.value.backdrop_path;
      coverUrl.value = `https://image.tmdb.org/t/p/w1280${moviePost.value}`;

      return coverUrl, movie;
    };

    const handleClick = (e) => {
      showModal.value = !showModal.value;
    };

    const toggleModalDetail = () => {
      showModal.value = !showModal.value;
      isHover.value = !isHover.value;
    };
    const closeModalDetail = () => {
      showModal.value = !showModal.value;
    };

    const toggleIsLike = () => {
      movie.value.isLike = !movie.value.isLike;
    };

    const toggleAddFav = () => {
      movie.value.isFav = !movie.value.isFav;
    };

    const toggleRemoveFav = (id) => {
      movie.value.isFav = !movie.value.isFav;
    };

    return {
      randomNum,
      trend,
      coverInfo,
      coverUrl,
      movie,
      handleClick,
      toggleIsLike,
      toggleAddFav,
      toggleRemoveFav,
      showModal,
      closeModalDetail,
      toggleModalDetail,
    };
  },
};
</script>

<style scoped>
.cover {
  position: relative;
}
.cover-img {
  height: 600px;
  background-size: cover;
}

.cover-info {
  position: absolute;
  bottom: 100px;
  left: 50px;
  font-size: 1.5rem;
}

.cover-title {
  position: absolute;
  top: 200px;
  left: 50px;
}

.cover-overview {
  width: 30%;
  height: 25%;
  position: absolute;
  top: 255px;
  left: 50px;
}
</style>