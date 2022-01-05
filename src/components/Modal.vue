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
          <div
            v-show="!movie.isFav"
            @click="addFav(movie.uid ? movie.uid : movie.id)"
          >
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
          v-show="!movie.isLike"
          @click="addLike(movie.uid ? movie.uid : movie.id)"
        >
          <!-- :class="{ like: movie.isLike }" -->
          <i class="fas fa-thumbs-up"></i>
        </div>
        <div
          v-show="movie.isLike"
          @click="removeLike(movie.uid ? movie.uid : movie.id)"
          :class="{ like: movie.isLike }"
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
import { onMounted } from "@vue/runtime-core";

export default {
  props: ["movie"],

  setup(props, { emit }) {
    const { error, addDoc } = useCollection("movielists");
    const { deleteDoc, updateDoc, getMovieId, movieId } =
      useDocument("movielists");

    const { user } = getUser();
    const { loadMovie, loadTv, movieInfo, movieCast, movieRecommend } =
      getMovie(props.movie.uid ? props.movie.uid : props.movie.id);

    onMounted(() => {
      compareFavMovie();
      compareLikeMovie();
    });

    const handleClick = (e) => {
      emit("showDetail");
    };

    const addFav = async (id) => {
      if (props.movie.isTv) {
        await loadTv();
      } else {
        await loadMovie();
      }
      props.movie.isFav = !props.movie.isFav;

      let favMovies = JSON.parse(localStorage.getItem("favMovieList")) || [];

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
        release_date: movieInfo.value.release_date
          ? movieInfo.value.release_date
          : movieInfo.value.first_air_date,
        cast: movieCast.value,
        genres: movieInfo.value.genres,
        movieRecommend: movieRecommend.value,
        userId: user.value.uid,
        uid: movieInfo.value.id,
        isFav: props.movie.isFav,
        isLike: props.movie.isLike,
        isTv: props.movie.isTv,
      };

      favMovies.push(movie);
      localStorage.setItem("favMovieList", JSON.stringify(favMovies));

      const res = await addDoc(movie);

      if (!error.value) {
        console.log("Movie added");
      }
    };

    const removeFav = async (id) => {
      props.movie.isFav = !props.movie.isFav;

      const { deleteDoc, getMovieId, movieId } = useDocument("movielists");

      let favMovies = JSON.parse(localStorage.getItem("favMovieList"));

      const removeIndex = favMovies.findIndex((movie) => movie.uid === id);

      if (removeIndex === -1) return;
      favMovies.splice(removeIndex, 1);

      localStorage.removeItem("favMovieList");
      localStorage.setItem("favMovieList", JSON.stringify(favMovies));

      await getMovieId(["uid", "==", id]);
      await deleteDoc(movieId.value);
      if (!error.value) {
        console.log("Movie removed");
      }
    };

    const addLike = async (id) => {
      const { updateDoc, getMovieId, movieId } = useDocument("movielists");
      if (props.movie.isTv) {
        await loadTv();
      } else {
        await loadMovie();
      }
      props.movie.isLike = !props.movie.isLike;

      let likeMovies = JSON.parse(localStorage.getItem("likeMovieList")) || [];

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
        release_date: movieInfo.value.release_date
          ? movieInfo.value.release_date
          : movieInfo.value.first_air_date,
        cast: movieCast.value ? movieCast.value : "",
        genres: movieInfo.value.genres,
        movieRecommend: movieRecommend.value,
        userId: user.value.uid,
        uid: movieInfo.value.id,
        isFav: props.movie.isFav,
        isLike: props.movie.isLike,
        isTv: props.movie.isTv,
      };

      likeMovies.push(movie);
      localStorage.setItem("likeMovieList", JSON.stringify(likeMovies));

      if (props.movie.isFav) {
        await getMovieId(["uid", "==", id]);
        await updateDoc(movieId.value, movie);
      }
      if (!error.value) {
        console.log("Movie liked");
      }
      // emit("addLike", props.movie.id);
    };

    const removeLike = async (id) => {
      props.movie.isLike = !props.movie.isLike;
      let likeMovies = JSON.parse(localStorage.getItem("likeMovieList"));

      const removeIndex = likeMovies.findIndex((movie) => movie.uid === id);

      if (removeIndex === -1) return;
      likeMovies.splice(removeIndex, 1);

      localStorage.removeItem("likeMovieList");
      localStorage.setItem("likeMovieList", JSON.stringify(likeMovies));

      const movie = {
        isLike: props.movie.isLike,
      };

      if (props.movie.isFav) {
        await getMovieId(["uid", "==", id]);
        await updateDoc(movieId.value, movie);
      }

      if (!error.value) {
        console.log("Movie unliked");
      }
    };

    // compare localstorage
    const compareFavMovie = () => {
      let favMovies = JSON.parse(localStorage.getItem("favMovieList")) || [];

      if (!favMovies) {
        return;
      }
      const matchFavMovie = favMovies.filter((movie) => {
        if (movie.uid === props.movie.id) {
          return movie;
        }
      });

      if (!matchFavMovie.length) {
        return;
      } else {
        props.movie["isFav"] = matchFavMovie[0].isFav;
      }
    };

    const compareLikeMovie = () => {
      let likeMovies = JSON.parse(localStorage.getItem("likeMovieList")) || [];

      if (!likeMovies) {
        return;
      }

      const matchLikeMovie = likeMovies.filter((movie) => {
        if (movie.uid === props.movie.id) {
          return movie;
        }
      });

      if (!matchLikeMovie.length) {
        return;
      } else {
        props.movie["isLike"] = matchLikeMovie[0].isLike;
      }
    };

    return { handleClick, addLike, removeLike, addFav, removeFav };
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

