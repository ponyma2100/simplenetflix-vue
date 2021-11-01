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

    // userRef = db.collection("Users").document(firebaseAuth.getCurrentUser().getUid());
    return { movies };
  },
};
</script >

<style scoped>
MyMovieList {
  flex-wrap: wrap;
}
</style>