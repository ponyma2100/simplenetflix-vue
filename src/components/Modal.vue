<template>
  <div class="modal">
    <div class="img">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>
    <div class="title">
      <p>{{ movie.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  setup(prop) {},
};
</script>

<style scoped>
.modal {
  position: relative;
  top: -150px;
  transform: scale(1.2, 1.5);
}
/* .movie:hover {
  width: 250px;
  height: 250px;
  transform: scale(1.5) translateY(-0.5rem);
} */
.modal img {
  height: 300px;
  width: 350px;
  object-fit: cover;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
}
</style>