<template>
  <div class="row">
    <h2>My List</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in movies" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleMovie from "../components/SingleMovie.vue";

export default {
  components: { SingleMovie },
  props: ["movies"],
};
</script>

<style scoped>
.row {
  padding-left: 15px;
}
.slide {
  width: 98vw;
  /* height: 350px; */
  /* max-height: 250px; */
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
}
.movie-list {
  padding: 10px 20px;
}
</style>