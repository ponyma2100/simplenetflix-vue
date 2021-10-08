<template>
  <div class="home">
    <div class="row">
      <h2>Weekly Trend</h2>
      <div class="slide">
        <div class="movie" v-for="movie in trend" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Top 10</h2>
      <div class="slide">
        <div class="movie" v-for="movie in top" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Netflix Original</h2>
      <div class="slide">
        <div class="movie" v-for="movie in origin" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Action</h2>
      <div class="slide">
        <div class="movie" v-for="movie in action" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Comedy</h2>
      <div class="slide">
        <div class="movie" v-for="movie in comedy" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Romance</h2>
      <div class="slide">
        <div class="movie" v-for="movie in romance" :key="movie.id">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getMovie from "../composables/getMovie";

export default {
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
    } = getMovie();

    getTrend();
    getTop();
    getNetflixOrigin();
    getAction();
    getComedy();
    getRomance();
    return { trend, origin, action, comedy, top, romance };
  },
};
</script>

<style scoped>
.slide {
  width: 98vw;
  height: 20vh;
  display: flex;
  padding: 0.5rem 0.5rem;
  overflow: scroll hidden;
}
.movie img {
  height: 170px;
  width: 250px;
  object-fit: cover;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
