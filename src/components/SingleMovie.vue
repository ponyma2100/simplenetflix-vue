<template>
  <div class="movie" @mouseenter="handleHover" v-if="movie">
    <div class="img" v-show="!isHover">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>

    <Modal
      :movie="movie"
      v-show="isHover"
      @mouseleave="isHover = false"
      @showDetail="toggleModalDetail"
    />
    <ModalDetail
      v-if="showModal"
      :movie="movie"
      @closeDetail="closeModalDetail"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";
import ModalDetail from "./ModalDetail.vue";

export default {
  props: ["movie"],
  components: { Modal, ModalDetail },
  setup(props) {
    const isHover = ref(false);
    const showModal = ref(false);

    const handleHover = (e) => {
      isHover.value = !isHover.value;
    };

    const toggleModalDetail = () => {
      showModal.value = !showModal.value;
      isHover.value = !isHover.value;
    };
    const closeModalDetail = () => {
      showModal.value = !showModal.value;
    };

    return {
      handleHover,
      isHover,
      toggleModalDetail,
      showModal,
      closeModalDetail,
    };
  },
};
</script>

<style scoped>
.movie {
  height: 200px;
  width: 280px;
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
