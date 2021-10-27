<template>
  <div class="home">
    <Cover />
    <MovieList />
  </div>
</template>

<script>
import MovieList from "../components/MovieList.vue";
import Cover from "../components/Cover.vue";

export default {
  components: { MovieList, Cover },
};
</script>

<style >
.home {
  margin-top: 70px;
}
</style>
