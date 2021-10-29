<template>
  <h1>My List</h1>
  <MyMovieList :movies="movies" />
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import MyMovieList from "../components/MyMovieList.vue";

export default {
  components: { MyMovieList },
  setup() {
    const { user } = getUser();
    const { documents: movies } = getCollection("movielists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    console.log("🚀 ~ file: MyList.vue ~ line 16 ~ setup ~ movie", movies);
    return { movies };
  },
};
</script>

<style>
</style>