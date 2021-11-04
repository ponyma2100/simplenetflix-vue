<template>
  <div class="modal">
    <div class="modal-img">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>
    <div class="modal-info">
      <div class="modal-button">
        <div class="btn-add">
          <div v-show="!movie.isFav" @click="addFav">
            <i class="fas fa-plus-circle"></i>
          </div>
          <div
            v-show="movie.isFav"
            @click="removeFav(movie.uid ? movie.uid : movie.id)"
            :class="{ fav: movie.isFav }"
          >
            <i class="far fa-check-circle"></i>
          </div>
        </div>
        <div
          class="btn-like"
          :class="{ like: movie.isLike }"
          @click="clickLike"
        >
          <i class="fas fa-thumbs-up"></i>
        </div>
        <div class="btn-info" @click="handleClick">
          <i class="fas fa-chevron-circle-down"></i>
        </div>
      </div>
      <div class="modal-description">
        <div class="title">
          <p>{{ movie.title ? movie.title : movie.name }}</p>
        </div>
        <div class="vote">
          <p>{{ movie.vote_average }} 平均評分</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useCollection from "@/composables/useCollection";
import useDocument from "../composables/useDocument";
import getUser from "../composables/getUser";
import getMovie from "../composables/getMovie";

export default {
  props: ["movie"],

  setup(props, { emit }) {
    const { error, addDoc } = useCollection("movielists");
    const { user } = getUser();
    const { loadMovie, movieInfo, movieCast, movieRecommend } = getMovie(
      props.movie.id
    );

    const handleClick = (e) => {
      emit("showDetail");
    };

    const clickLike = (e) => {
      emit("addLike", props.movie.id);
    };

    const addFav = async (e) => {
      await loadMovie();
      emit("addFav", props.movie.id);
      const movie = {
        poster_path: movieInfo.value.poster_path,
        backdrop_path: movieInfo.value.backdrop_path,
        title: movieInfo.value.title
          ? movieInfo.value.title
          : movieInfo.value.name,
        name: movieInfo.value.name
          ? movieInfo.value.name
          : movieInfo.value.title,
        vote: movieInfo.value.vote_average,
        release_date: movieInfo.value.release_date,
        cast: movieCast.value,
        genres: movieInfo.value.genres,
        movieRecommend: movieRecommend.value,
        userId: user.value.uid,
        uid: movieInfo.value.id,
        isFav: props.movie.isFav,
        isLike: props.movie.isLike,
      };
      const res = await addDoc(movie);

      if (!error.value) {
        console.log("Movie added");
      }
    };

    const removeFav = async (id) => {
      const { deleteDoc, getMovieId, movieId } = useDocument("movielists");

      emit("removeFav", props.movie.id);
      await getMovieId(["uid", "==", id]);
      await deleteDoc(movieId.value);
      if (!error.value) {
        console.log("Movie removed");
      }
    };

    return { handleClick, clickLike, addFav, removeFav };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  height: 300px;
  width: 300px;
  border-radius: 8px;
  transform: translateX(-10px) translateY(-50px);
  z-index: 999;
  opacity: 1;
  background: #222222;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  cursor: pointer;
  top: 0;
  left: -200px;
}

.modal-button {
  display: flex;
  font-size: 1.5rem;
  padding-top: 5px;
}

.modal-info {
  padding: 5px;
}
.modal-img {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
}

.modal-img img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}
.title {
  font-size: 1.5rem;
  font-weight: bolder;
}

.vote p {
  color: #46d369;
  font-weight: bold;
}

.like,
.fav {
  color: #46d369;
}
</style>