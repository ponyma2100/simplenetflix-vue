<template>
  <div class="movie" @mouseenter="handleHover">
    <div class="img" v-show="!isHover">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>
    <Modal :movie="movie" v-show="isHover" @mouseleave="isHover = false" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";

export default {
  props: ["movie"],
  components: { Modal },
  setup(prop) {
    const isHover = ref(false);

    const handleHover = (e) => {
      isHover.value = !isHover.value;
      console.log(
        "🚀 ~ file: SingleMovie.vue ~ line 25 ~ handleHover ~ isHover.value",
        isHover.value
      );
    };

    return { handleHover, isHover };
  },
};
</script>

<style scoped>
.movie {
  height: 170px;
  width: 250px;
  margin: 5px;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.movie img {
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

button {
  margin-bottom: 10px;
}
</style>
