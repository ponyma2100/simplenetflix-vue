<template>
  <div class="cover">
    <img :src="coverUrl" alt="" />
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import getMovies from "../composables/getMovies";

export default {
  setup() {
    const { getTrend, trend } = getMovies();
    getTrend();

    const randomNum = ref(Number);
    const coverUrl = ref("");
    const moviePost = ref("");

    randomNum.value = Math.floor(Math.random() * 20);

    const coverImage = computed(() => {
      moviePost.value = trend.value[randomNum.value].poster_path;
      coverUrl.value = `https://image.tmdb.org/t/p/original${moviePost.value}`;
      return coverUrl;
    });

    return { randomNum, trend, coverImage, coverUrl };
  },
};
</script>

<style>
</style>