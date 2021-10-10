<template>
  <div class="movie" v-show="!isHover" @mouseenter="handleHover">
    <div class="img">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>
  </div>
  <Modal :movie="movie" v-show="isHover" @mouseleave="handleHover" />
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
    };

    return { handleHover, isHover };
  },
};
</script>

<style scoped>
.movie img {
  height: 170px;
  width: 250px;
  object-fit: cover;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
}

button {
  margin-bottom: 10px;
}
</style>
