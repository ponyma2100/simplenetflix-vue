<template>
  <div class="row">
    <h2>Weekly Trend</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in trend" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
  <div class="row">
    <h2>Top10</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in top" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
  <div class="row">
    <h2>Netflix Original</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in origin" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
  <div class="row">
    <h2>Action</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in action" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
  <div class="row">
    <h2>Comedy</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in comedy" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
  <div class="row">
    <h2>Romance</h2>
    <div class="slide">
      <div class="movie-list" v-for="movie in romance" :key="movie.id">
        <SingleMovie :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import getMovies from "../composables/getMovies";
import SingleMovie from "../components/SingleMovie.vue";
import Modal from "../components/Modal.vue";

export default {
  components: { SingleMovie, Modal },
  setup() {
    const {
      getTrend,
      getNetflixOrigin,
      getAction,
      getComedy,
      getTop,
      getRomance,
      trend,
      origin,
      action,
      comedy,
      top,
      romance,
    } = getMovies();

    getTrend();
    getTop();
    getNetflixOrigin();
    getAction();
    getComedy();
    getRomance();

    return {
      trend,
      origin,
      action,
      comedy,
      top,
      romance,
    };
  },
};
</script>

<style scoped>
.row {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 310px;
}

.slide {
  width: 98vw;
  /* max-height: 250px; */
  display: flex;
  padding: 0.5rem 0.5rem;
}
</style>