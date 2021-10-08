<template>
  <div class="home">
    <h2>Weekly Trend</h2>
    <div class="slide">
      <div class="trend" v-for="movie in trend" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import getMovie from "../composables/getMovie";

export default {
  setup() {
    const { getTrend, trend } = getMovie();
    getTrend();
    return { trend };
  },
};
</script>

<style scoped>
.slide {
  width: 95vw;
  height: 20vh;
  display: flex;
  padding: 0.5rem 0.5rem;
  overflow: scroll hidden;
}
.trend img {
  height: 150px;
  width: 210px;
  object-fit: cover;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
